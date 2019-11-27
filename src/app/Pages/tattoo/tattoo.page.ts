import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ViewController } from '@ionic/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-tattoo',
  templateUrl: './tattoo.page.html',
  styleUrls: ['./tattoo.page.scss'],
})
export class TattooPage implements OnInit {

  tattooForm : FormGroup;
  db=firebase.firestore();
  tattoo = {
    name: '',
    pricerange: '',
    description: '',
    image: '',
    categories:''
    
  }
  Tattoos:[];

   Button : string = "";
  
   categories : string
   priceRange :  string
   description : string
   image :  string
   name :  string
  

   editButton : boolean;
   addTattoo : boolean;

  
   

  toastCtrl: any;
  alertCtrl: any;
  actionSheetCtrl: any;
  num: number;
  MyValue: boolean;
  MyValue1: boolean;
  docId:any;

  ShowButton : boolean = false;
  ShowButton1 : boolean = false;

  get TattooName() {
    return this.tattooForm.get('tattooName');
  }
  get Price() {
    return this.tattooForm.get('priceRange');
  }
  get Categories() {
    return this.tattooForm.get('categories');
  }
  get Description() {
    return this.tattooForm.get('description');
  }
  get Image() {
    return this.tattooForm.get('image');
  }
 
  constructor(private camera: Camera, private modalController: ModalController, private auth: AuthenticationService,public actionSheetController: ActionSheetController, private fb: FormBuilder) { 
    
   }

   ionViewWillEnter(){
    

    this.editButton = this.auth.editButton;
    this.addTattoo  = this.auth.addTattoo;
    this.Button = this.auth.myObj.Button;
 
    this.categories = this.auth.myObj.obj.categories;
    this.priceRange = this.auth.myObj.obj.priceRange;
    this.description= this.auth.myObj.obj.description;
    this.image = this.auth.myObj.obj.image;
    this.name = this.auth.myObj.obj.name;


    this.tattoo.name = this.auth.myObj.obj.name;
    this.tattoo.categories = this.auth.myObj.obj.categories;
    this.tattoo.pricerange = this.auth.myObj.obj.priceRange;
    this.tattoo.description= this.auth.myObj.obj.description;
    this.tattoo.image = this.auth.myObj.obj.image;
   


    console.log("111111111", this.auth.myObj.obj);
    
   }


  ngOnInit() {
    this.tattooForm = this.fb.group({
      tattooName: new FormControl('', Validators.compose([Validators.required])),
      priceRange: new FormControl('', Validators.compose([Validators.required])),
      categories: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      image: ['']
    })
  }

  EditTattoo(){
       this.db.collection("Tattoo").doc(this.auth.myObj.obj.docid).update({categories: this.tattoo.categories, name:this.tattoo.name, pricerange : this.tattoo.pricerange, description : this.tattoo.description, image : this.tattoo.image})
       this.dismiss();
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

  addtattoo(tattooForm){

    if (tattooForm.valid ) {
      this.db.collection("Tattoo").doc().set(this.tattoo);
      this.tattoo = {
        name: '',
        pricerange: '',
        description: '',
        image: '',
        categories:''
        
      }
      this.dismiss();
  
  }else {
    this.Categories.markAllAsTouched();
    this.Price.markAllAsTouched();
    this.Description.markAllAsTouched();
    this.TattooName.markAllAsTouched();
  }


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
 
  

