import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  username: string=""
  password: string=""

  loader = true;

  get Username() {
    return this.loginForm.get('usernameL');
  }
  get Password() {
    return this.loginForm.get('passowrd');
  }


  constructor(private router: Router, private fb: FormBuilder, public toastCtrl: ToastController) { }

  ngOnInit() {

    setTimeout(() => {
        this.loader = false;
    }, 4000);

    this.loginForm = this.fb.group({
      usernameL: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(6)])),
    })
  }

 



  Login(){
    this.loader = true;
    const {username,password}=this
    firebase.auth().signInWithEmailAndPassword(username, password).then((result) => {
      
      console.log("Logged in succesful")
      this.router.navigateByUrl('/landing');
      setTimeout(() => {
        this.loader = false;
      }, 4000);
  }).catch((error) => {
    setTimeout(() => {
      this.loader = false;
    }, 4000);

    this.presentToast();
  
  });

  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Oooweee! Admin not found!!',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
