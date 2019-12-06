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
  storage = firebase.storage().ref();
  ShowButton : boolean = false;
  ShowButton1 : boolean = false;
  fileField: any;
  toastController: any;

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



    
    //

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



  changeListener(event): void {
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
        this.tattoo.image = dwnURL;
      });
    });
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



  }
 
  

