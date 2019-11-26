import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authInfo$: any;
  constructor() { }

  
  get isLoggedIn() {
    
    return true;
  }
  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
}
