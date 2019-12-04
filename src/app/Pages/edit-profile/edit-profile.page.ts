import { ModalController } from '@ionic/angular';
import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})

export class EditProfilePage implements OnInit {


  email : string;
  phoneNumber : string;
  name : string;

  constructor(public data : DataService, private modalController: ModalController) { }

  ngOnInit() {
    console.log("ttttttttttt", this.data.MyData);
    // this.name  = this.data.MyData.
    this.phoneNumber = this.data.MyData.phoneNumber;
    this.email = this.data.MyData.email;
    this.name = this.data.MyData.name;
  }

  ionViewWillEnter(){
   
  }

  editData(){
    console.log("aaaaaaaaaa", this.data.MyData);
    firebase.firestore().collection("Admin").doc(this.data.MyData.id).update( {
      name : this.name,
      phoneNumber : this.phoneNumber,
      email : this.email
    });
  }

  

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}


