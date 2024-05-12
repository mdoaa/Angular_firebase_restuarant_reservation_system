import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DBService } from './../services/db.service';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  constructor(private router:Router,private db:DBService) { }
  timeSlots: { time: string, seats: number }[] = [{ time: '', seats: 0 }];

  addSlot() {
    this.timeSlots.push({ time: '', seats: 0 });
  }

  removeSlot(index: number) {
    this.timeSlots.splice(index, 1);
  }
 
  onSubmit(form:NgForm) {
      // Combine form value with time slots
      const restaurant = { ...form.value, timeSlots: this.timeSlots };
      this.db.addRestaurant(restaurant)
        .then((data:DocumentReference)=>{
          console.log(data.id);
        })
        .catch((err)=>{
          console.log(err);
        });
      this.router.navigate(['/'], { queryParams: form.value });  
  }
}
