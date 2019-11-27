import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";

  loader = true;

  constructor(private router: Router, public toastCntrl: ToastController) { }

  ngOnInit() {

    setTimeout(() => {
      this.loader = false;
    }, 4000);
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
    const toast = await this.toastCntrl.create({
      message: 'Oooweee! Admin not found!!',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
