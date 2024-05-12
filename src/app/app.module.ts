import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { HomeComponent } from './home/home.component';
import { UpdateResturantComponent } from './update-resturant/update-resturant.component';



const routes=[
  {path:'add',component:AddComponent},
  {path:'restaurant/:id',component:RestaurantComponent},
  {path:'',component:HomeComponent},
  {path:'update/:id',component:UpdateResturantComponent},
  
]
@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    RestaurantComponent,
    HomeComponent,
    UpdateResturantComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    provideFirebaseApp(() => initializeApp({"projectId":"sw2proj-a8013","appId":"1:858178109383:web:678026ea60b31b271863e2","storageBucket":"sw2proj-a8013.appspot.com","apiKey":"AIzaSyBgJqUa6dg27s7mIbgySymUT_6GFEcapsQ","authDomain":"sw2proj-a8013.firebaseapp.com","messagingSenderId":"858178109383"})),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
