import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { restaurant } from './../models/restaurant';
import { DBService } from './../services/db.service';

@Component({
  selector: 'app-update-resturant',
  templateUrl: './update-resturant.component.html',
  styleUrls: ['./update-resturant.component.css']
})
export class UpdateResturantComponent {
  resid: any;
  res: restaurant = { timeSlots: [] }; // Ensure res.timeSlots is initialized as an empty array

  constructor(private db: DBService, private aR: ActivatedRoute, private router: Router) {
    this.resid = this.aR.snapshot.params["id"];
    this.db.getRestaurant(this.resid)
      .subscribe((data) => {
        this.res = data;
        if (!this.res.timeSlots) {
          this.res.timeSlots = []; // Initialize timeSlots array if it's undefined
        }
      });
  }

  onSubmit(form: NgForm) {
    this.db.updateRestaurant(this.resid, this.res)
      .then((data) => {
        // Handle success
      })
      .catch((err) => {
        // Handle error
      });
  }


  addTimeSlot() {
    // Ensure this.res.timeSlots is initialized
    if (!this.res.timeSlots) {
      this.res.timeSlots = [];
    }
    // Add a new time slot with default values
    this.res.timeSlots.push({ time: '', seats: 0 });
  }

  removeTimeSlot(index: number) {
    // Ensure this.res.timeSlots is initialized
    if (!this.res.timeSlots) {
      this.res.timeSlots = [];
    }
    // Remove the time slot at the specified index
    this.res.timeSlots.splice(index, 1);
  }
}
