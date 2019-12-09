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

  MyData = {
     
    name : "",
    image:"",
    email :  "",
    address : "",
    phoneNumber : "",
    auId : ""

  };

  email : string;
  phoneNumber : string;
  name : string;
  image:string;
  db = firebase.firestore();
  constructor(public data : DataService, private modalController: ModalController) { }

  ngOnInit() {
    console.log("ttttttttttt", this.data.MyData);
    this.phoneNumber = this.data.MyData.phoneNumber;
    this.email = this.data.MyData.email;
    this.name = this.data.MyData.name;
    this.image = this.data.Mydata.image;
  }

  ionViewWillEnter(){

    this.db.collection("Admin").get().then(data => {
      data.forEach(item => {
      
        this.MyData.name = item.data().name,
        
        
    this.MyData.email = item.data().email,
    this.MyData.address = item.data().address,
    this.MyData.phoneNumber = item.data().phoneNumber,
    
    this.MyData.auId = item.id
      })
    })
   
  }

  editData(){
  
this.db.collection("Admin").doc(this.MyData.auId).update({
  address :this.MyData.address,
  email:this.MyData.email,
  name:this.MyData.name,
  image:this.MyData.image,
  phoneNumber:this.MyData.phoneNumber
})
    this.dismiss() 
  }

  

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}


