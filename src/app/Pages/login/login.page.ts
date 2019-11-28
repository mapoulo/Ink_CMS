import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  username: string=""
  password: string=""

  get Username() {
    return this.loginForm.get('usernameL');
  }
  get Password() {
    return this.loginForm.get('passowrd');
  }


  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      usernameL: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(6)])),
    })
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
