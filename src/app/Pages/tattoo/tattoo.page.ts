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
    startPrice :  '',
    endPrice: '',
    description: '',
    image: '',
    categories:'',
    pricerange:''
  }
  Tattoos:[];
   Button : string = "";
  
   categories : string;
   startPrice :  string;
   endPrice :  string;
   description : string;
   image :  string;
   name :  string;
   pricerange:string;
  
   results
  
   editButton : boolean;
   addTattoo : boolean;
 
  
   
  toastCtrl: any;
  alertCtrl: any;
  actionSheetCtrl: any;
  num: number;
  MyValue: boolean;
  MyValue1: boolean;
  docId:any;
  storage = firebase.storage().ref();
  ShowButton : boolean = false;
  ShowButton1 : boolean = false;
  fileField: any;
  toastController: any;
  get TattooName() {
    return this.tattooForm.get('tattooName');
  }
  get StartPrice() {
    return this.tattooForm.get('startPrice');
  }
  get EndPrice() {
    return this.tattooForm.get('endPrice');
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
  // get Start() {
  //   return this.tattooForm.get('start');
  // }
 
  // get End() {
  //   return this.tattooForm.get('end');
  // }
 
  loader: boolean = false;
  constructor(private camera: Camera, private modalController: ModalController, private auth: AuthenticationService,public actionSheetController: ActionSheetController, private fb: FormBuilder) { 
    
   }
   ionViewWillEnter(){
    
    this.editButton = this.auth.editButton;
    this.addTattoo  = this.auth.addTattoo;
    this.Button = this.auth.myObj.Button;
   
    this.categories = this.auth.myObj.obj.categories;
    //  this.start = this.auth.myObj.obj.startPrice;
    //  this.end = this.auth.myObj.obj.endPrice;
    // this.description= this.auth.myObj.obj.description;
    // this.image = this.auth.myObj.obj.image;
    // this.name = this.auth.myObj.obj.name;
    // this.start = this.auth.myObj.obj.start;
    // this.end = this.auth.myObj.obj.end;
    //console.log("Start",this.end);
   // this.results= `${this.tattoo.start}-${this.tattoo.end} `
   
    this.tattoo.name = this.auth.myObj.obj.name;
    this.tattoo.categories = this.auth.myObj.obj.categories;
    this.tattoo.startPrice = this.auth.myObj.obj.startPrice;
    this.tattoo.endPrice = this.auth.myObj.obj.endPrice;
    // this.tattoo.pricerange = `${this.tattoo.start}-${this.tattoo.end} `;
    
    this.tattoo.description= this.auth.myObj.obj.description;
    this.tattoo.image = this.auth.myObj.obj.image;
   
    console.log("111111111", this.auth.myObj.obj);
    
   }
  ngOnInit() {
    
    //
    this.tattooForm = this.fb.group({
      tattooName: new FormControl('', Validators.compose([Validators.required])),
      startPrice: new FormControl('', Validators.compose([Validators.required])),
      endPrice: new FormControl('', Validators.compose([Validators.required])),
      //end: new FormControl('', Validators.compose([Validators.required])),
      categories: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      image:new FormControl('', Validators.compose([Validators.required])),
     
    })
  }
  EditTattoo(tattooForm : FormGroup){
       this.db.collection("Tattoo").doc(this.auth.myObj.obj.docid).update({categories: this.tattoo.categories, name:this.tattoo.name,startPrice : this.tattoo.startPrice,endPrice : this.tattoo.endPrice, description : this.tattoo.description, image : this.tattoo.image})
       this.dismiss();
  }
  alphaOnly(event) {
   // console.log('Input ', );
    var key = event.detail.data;
    return ((key >= 65 && key <= 90) || key == 8);
  };
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
        this.tattoo.image = dwnURL;
      });
    });
  }
  addtattoo(tattooForm : FormGroup){
    this.tattoo.pricerange=  this.tattoo.startPrice +  + this.tattoo.endPrice;
    if (tattooForm.valid ) {
      
      this.db.collection("Tattoo").doc().set(this.tattoo);
      this.tattoo = {
        name: '',
        startPrice: '',
        endPrice: '',
        description: '',
        image: '',
        categories:'',
        pricerange:''
      
      }
     
      this.dismiss();
  
  }else {
    this.Categories.markAllAsTouched();
    this.StartPrice.markAllAsTouched();
    this.EndPrice.markAllAsTouched();
    this.Description.markAllAsTouched();
    this.TattooName.markAllAsTouched();
  }
}
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  }