import { firebaseConfig } from './../../Environment';
import { ModalController } from '@ionic/angular';
import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})

export class EditProfilePage implements OnInit {


  address  = "";
  name = "";
  phoneNumber = "";
  email = "";


  currentImage: any;

  MyData = {
     
    name : "",
    image:"",
    email :  "",
    address : "",
    phoneNumber : "",
    auId : "",
    pdf: ""

  };

  storage = firebase.storage().ref();
  image1 = "";

  
  image:string;
  db = firebase.firestore();
  constructor(public data : DataService, private camera: Camera,  private modalController: ModalController) { }

  ngOnInit() {
  
    this.phoneNumber = this.data.MyData.phoneNumber;
    this.email = this.data.MyData.email;
    this.name = this.data.MyData.name;
    this.image = this.data.Mydata.image;
    
  }

  ionViewWillEnter(){

    this.db.collection("Admin").get().then(data => {
      data.forEach(item => {
      
    this.MyData.name = item.data().name,   
    this.MyData.image = item.data().image,
    this.MyData.email = item.data().email,
    this.MyData.address = item.data().address,
    this.MyData.phoneNumber = item.data().phoneNumber,
    this.MyData.pdf = item.data().pdf,
    this.MyData.auId = item.id

      })
    })
   
  }



  editData(){


    console.log("Method is called", this.MyData.auId);
    

this.db.collection("Admin").doc(this.MyData.auId).update({
  address :this.MyData.address,
  email:this.MyData.email,
  name:this.MyData.name,
  phoneNumber:this.MyData.phoneNumber,

})
    this.dismiss() 


  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }


  Editimage(event){
 

    const i = event.target.files[0];
    console.log(i);
    const upload = this.storage.child(i.name).put(i);
    upload.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('upload is: ', progress , '% done.');
    }, err => {
    }, () => {
      upload.snapshot.ref.getDownloadURL().then(dwnURL => {
        console.log('File avail at: ', dwnURL);
        this.image1 = dwnURL;

        
      });
    });
  
    
    
  }

  

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}


