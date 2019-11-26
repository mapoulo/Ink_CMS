import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ViewController } from '@ionic/core';
import { ModalController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tattoo',
  templateUrl: './tattoo.page.html',
  styleUrls: ['./tattoo.page.scss'],
})
export class TattooPage implements OnInit {
  db=firebase.firestore();
  tattoo = {
    name: '',
    pricerange: '',
    description: '',
    image: '',
    categories:''
    
  }
  Tattoos:[];

  toastCtrl: any;
  alertCtrl: any;
  actionSheetCtrl: any;
  num: number;
  MyValue: boolean;
  MyValue1: boolean;
  docId:any;
 
  constructor(private camera: Camera, private modalController: ModalController,public actionSheetController: ActionSheetController) { 
    
   }

  ngOnInit() {
  }
  async selectImage() {
    const actionSheet = await this.actionSheetCtrl.create({
      title: "Select image",
      cssClass: "class_used_to_set_icon",
      buttons: [{
        icon: 'images',
        text: 'Gallery',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY)
        }
      },
      {
        icon: 'camera',
        text: 'Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA)
        }
      },
      {
        icon: 'close',
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }




  async takePicture(sourcetype: number) {

    console.log(';;;;;;;;;');

    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: sourcetype,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetHeight: 600,
      targetWidth: 600
    }
    this.camera.getPicture(options).then((picture) => {
      this.tattoo.image = 'data:image/jpeg;base64,' + picture;
    }, (err) => {
      console.log('error: ', err);
   
    });

    let storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    let file = 'my-/' + filename + '.jpg';
    const imageRef = storageRef.child(file).putString(this.tattoo.image, firebase.storage.StringFormat.DATA_URL)
    imageRef.on('state_changed', snap => {
      this.tattoo.image = 'Uploading ' + (snap.bytesTransferred / snap.totalBytes) * 100 + '%'
    }, err => {
      switch (err.name) {
        case 'storage/unauthorized':
          this.tattoo.image = "User doesn't have permission to access the object"
          break;

        case 'storage/canceled':
          this.tattoo.image = "User canceled the upload"
          break;

        case 'storage/unknown':
          this.tattoo.image = "Unknown error occurred, Please try again"
          break;
      }
    }, () => {
      imageRef.snapshot.ref.getDownloadURL().then(downUrl => {
        this.tattoo.image = downUrl;
      })
    })
   

   
  }

  addtattoo(){
      this.db.collection("Tattoo").doc().set(this.tattoo);
      this.tattoo = {
        name: '',
        pricerange: '',
        description: '',
        image: '',
        categories:''
        
      }
      this.dismiss();
  
  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  CheckData(){
    this.num = 1;
    if (this.tattoo.name === '') {
      console.log("Data is empty");
      this.MyValue = true;

    } else {
      console.log("Data is not empty");
      this.MyValue = false;
    }
  }
  // addData1(data) {

  //   if (data.name !== undefined && data.name !== null) {
  //     this.db.collection("Tatto").doc(this.docId).update({
  //       name: data.name,
  //       pricerange: data.pricerange,
  //       description: data.description,
  //       image: data.image,
  //       categories: data.categories

  //     });
      
  //     this.Tattoos = [];
  
  //   }
  // }
  // expandDiv() {
  //   this.tattoo.name = ''
  //   this.tattoo.pricerange = ''
  //   this.tattoo.description = ''
  //   this.tattoo.image = ''
  //   this.CheckData();
    
  // }

  }
 
  

