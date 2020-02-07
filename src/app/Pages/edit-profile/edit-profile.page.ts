import { firebaseConfig } from './../../Environment';
import { ModalController } from '@ionic/angular';
import { DataService } from './../../data.service';
import { Component, NgZone, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { google } from "google-maps";

declare var google : google;





import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {


  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;


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
  tattooForm : FormGroup;
  image:string;
  loader: boolean = false;
  db = firebase.firestore();
  validation_messages = {
    'name': [
      { type: 'required', message: 'Name  is required.' },
    ],
    'phoneNumber': [
      { type: 'required', message: 'Number  is required.' },
    ],
    'email': [
      {type: 'required', message: 'Email address is required.'},
      {type: 'pattern', message: 'Email address is not Valid.'},
      {type: 'validEmail', message: 'Email address already exists in the system.'},
    ],
    'address': [
      {type: 'required', message: 'address is required.'},
      
    ]
  }
  constructor( public zone: NgZone,  public data : DataService, private camera: Camera,  private modalController: ModalController,private fb: FormBuilder) {
    this.tattooForm = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),
      address: new FormControl('', Validators.compose([Validators.required])),
      phoneNumber: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10)]))
     
    })


    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

   
  }


  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }



  GoTo(){
    return window.location.href = 'https://www.google.com/maps/place/?q=place_id:'+this.placeid;
  }

  selectSearchResult(item) {
    console.log(item)
    this.location = item;
    this.autocomplete.input = item.description;
    this.placeid = this.location.place_id;
    this.autocompleteItems = [];
    console.log('placeid'+ this.placeid)
  }

  HideList() {
    
  }
  


  ngOnInit() {
    this.db.collection("Admin").onSnapshot(data => {
      data.forEach(item => {
      
        console.log("Adimd  ddddd ", item.data());
        
    this.MyData.name = item.data().name,   
    this.MyData.image = item.data().image,
    this.MyData.email = item.data().email,
    this.MyData.address = item.data().address,
    this.MyData.phoneNumber = item.data().phoneNumber,
    this.MyData.pdf = item.data().pdf,
    this.MyData.auId = item.id
      })
    })
 
   
  
    this.phoneNumber = this.data.MyData.phoneNumber;
    this.email = this.data.MyData.email;
    this.name = this.data.MyData.name;
    this.image = this.data.Mydata.image;
    
  }
  ionViewDidEnter(){
 
  }

  editData(){
    console.log("Method is called", this.MyData.auId);
    
this.db.collection("Admin").doc(this.MyData.auId).update({
  address :this.MyData.address,
  email:this.MyData.email,
  name:this.MyData.name,
  phoneNumber:this.MyData.phoneNumber,
  image : this.MyData.image,
  placeId : this.placeid
})
    this.dismiss() 
  }
  changeListener(event): void {
    console.log("My Method is Called");
    
    const i = event.target.files[0];
    console.log(i);
    const upload = this.storage.child(i.name).put(i);
    upload.on('state_changed', snapshot => {
      this.loader=true;
     
      setTimeout(() => {
        this.loader = false;
     }, 1000);
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('upload is: ', progress , '% done.');
    }, err => {
    }, () => {
      upload.snapshot.ref.getDownloadURL().then(dwnURL => {
        console.log('File avail at: ', dwnURL);
        this.MyData.image = dwnURL;
      });
    });
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