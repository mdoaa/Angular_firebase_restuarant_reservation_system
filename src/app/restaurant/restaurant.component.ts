import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { restaurant } from './../models/restaurant';
import { DBService } from './../services/db.service';
import emailjs from '@emailjs/browser';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {
  resid: any;
  res: restaurant = {};
  seatsnum:number[]=new Array(10).fill(0);
  saved:number[]=new Array(10).fill(0);
  tempSeats: { [key: string]: number }[] = []; // Array to hold temporary values for each time slot

  constructor(private db: DBService, private aR: ActivatedRoute, private router: Router) {
    this.resid = this.aR.snapshot.params["id"];
    this.db.getRestaurant(this.resid)
      .subscribe((data: any) => {
        this.res = data;
        // Initialize temporary seats array with default values
        if (this.res.timeSlots) {
          this.tempSeats = this.res.timeSlots.map(slot => ({ [slot.time]: slot.seats }));
        }
      });
  }

  decreaseSeats(slotIndex: number, time: string) {
    if (this.tempSeats[slotIndex][time] > 0) {
      this.tempSeats[slotIndex][time] -= 1;
      this.seatsnum[slotIndex]+=1;
      this.saved[slotIndex]=0;
    }
  }

  incSeats(slotIndex: number, time: string) {
    this.tempSeats[slotIndex][time] += 1;
    this.seatsnum[slotIndex]-=1;
  }

  saveSeats(slotIndex: number) {
    // Ensure that res and timeSlots are defined
    if (this.res && this.res.timeSlots) {
      const slot = this.res.timeSlots[slotIndex];
      const time = slot.time;
      this.saved[slotIndex]=1;

      // Find the corresponding temporary seat count object
      const tempSlot = this.tempSeats[slotIndex];

      // Update the seat count for the specific time slot
      slot.seats = tempSlot[time];

      // Create a copy of the res object with updated time slot
      const updatedRes = { ...this.res };

      // Check if timeSlots is defined
      if (updatedRes.timeSlots) {
        updatedRes.timeSlots[slotIndex] = { ...slot };
      } else {
        updatedRes.timeSlots = [...this.res.timeSlots];
        updatedRes.timeSlots[slotIndex] = { ...slot };
      }

      // Update the seat count in the database
      emailjs.init('jggSFPMdkl4BCjhDL');
      emailjs
        .send('service_ia3gtut', 'template_fgaaexp',{
          to_name:" admin",
          from_name:"system",
         to_email: 'swproj2024@gmail.com',
          subject: `update in your number of seats in ${updatedRes.name} `,
          message:`your new number of seats at ${slot.time} is ${slot.seats}`,
        })
        .then(
          (response) => {
            console.log('SUCCESS!', response.status, response.text);
          },
          (err) => {
            console.log('FAILED...', err);
          },
        );
      this.db.updateRestaurant(this.resid, updatedRes)
        .then(() => {
          console.log('Seats saved successfully for time slot:', time);
        })
        .catch(() => {
          //console.error('Error saving seats for time slot:', time, err);
        });
    } else {
      console.error('Restaurant or time slots are undefined.');
    }
}


  navigateToUpdate() {
    this.router.navigate(['/update', this.resid]);
  }
}
