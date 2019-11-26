import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string=""
  password: string=""

  constructor(private router: Router) { }

  ngOnInit() {
  }


  Login(){
    const {username,password}=this
    firebase.auth().signInWithEmailAndPassword(username, password).then((result) => {
      
      console.log("Logged in succesful")
      this.router.navigateByUrl('/landing');
  }).catch((error) => {
    console.log("User not found")
     let errorCode = error.code;
     let errorMessage = error.message;
 
  });

  }


}
