import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  myObj = {Button : '', obj : {name : '', categories : '', priceRange : '',startPrice:'',endPrice:'', docid: '', description : '', image : ''}, obje : {}};
  editButton : boolean;
  addTattoo : boolean;
  authInfo$: any;
  constructor() { }
  
  get isLoggedIn() {
    
    return true;
  }
  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
  dataSaved = {
    email : "",
  
  }
}
