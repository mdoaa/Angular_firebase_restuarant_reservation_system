import { Component } from '@angular/core';
import { restaurant } from './../models/restaurant';
import { DBService } from './../services/db.service';
import { ActivatedRoute ,Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
  Resturant:restaurant[]=[]
  constructor(private db:DBService,private aR:ActivatedRoute,private router:Router)
 {
    this.db.getRestaurants().subscribe((data)=>{
      console.log(data);
      this.Resturant=data;
    })
 }
 Add(){
  this.router.navigate(['/add']);
 }

 deleteRestaurant(id:string){
  this.db.deleteRestaurant(id);
 }
}
