import { restaurant } from '../models/restaurant';
import { Injectable } from '@angular/core';
import { collection, collectionData, docData, Firestore, setDoc,  } from '@angular/fire/firestore';
import { addDoc, deleteDoc, doc, } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private firestore:Firestore) { 

  }
  addRestaurant(product:restaurant)
  {
    let $productsRef=collection(this.firestore,"restaurants");
    return addDoc($productsRef,product);
  }
  getRestaurants()
  {
    let $productsRef=collection(this.firestore,"restaurants");
    return collectionData($productsRef,{idField:"id"}) as Observable<restaurant[]>;
  }
  deleteRestaurant(id:string)
  {
    let $productRef=doc(this.firestore,"restaurants/"+id);
    return deleteDoc($productRef);
  }

  getRestaurant(id:string)
  {
    let $productRef=doc(this.firestore,"restaurants/"+id);
    return docData($productRef,{idField:"id"}) as Observable<restaurant>;
  }
  updateRestaurant(id:string,product:restaurant)
  {
    let $productRef=doc(this.firestore,"restaurants/"+id);
    return setDoc($productRef,product);
  }
}
