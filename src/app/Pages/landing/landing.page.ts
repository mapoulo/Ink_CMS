import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ModalController, AlertController } from '@ionic/angular';
import { TattooPage } from '../tattoo/tattoo.page';
import { AuthenticationService } from 'src/app/services/authentication.service';




@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  tattoo = {
    name: '',
    pricerange: '',
    description: '',
    image: '',
    categories:''
    
  }
db = firebase.firestore();
Tattoos = [];
MyValue: boolean;
MyValue1: boolean;
  num: number;
  docId: string;

  constructor(public rout : Router,private auth: AuthenticationService, public modalController: ModalController, public alertCtrl: AlertController) { }

  ngOnInit() {
    
  }

 
  obj = {id: null, obj : null}
  ionViewWillEnter(){

    let firetattoo = {
      docid: '',
      name: '',
      pricerange: '',
      description: '',
      image: '',
      categories:''
    }

    this.db.collection('Tattoo').onSnapshot(data => {
      this.Tattoos = [];
      data.forEach(item => {
        firetattoo.categories = item.data().categories;
        firetattoo.name = item.data().name;
        firetattoo.pricerange = item.data().pricerange;
        firetattoo.categories = item.data().categories;
        firetattoo.image = item.data().image;
        firetattoo.docid = item.id;
        firetattoo.description = item.data().description;
        this.Tattoos.push(firetattoo)
        firetattoo = {
          docid: '',
          name: '',
          pricerange: '',
          description: '',
          image: '',
          categories:''
        }
      })
      
    })

  }
  goToNotificationsPage(){
    this.rout.navigateByUrl('/notifications')

     

}
goProfilePage(){
  this.rout.navigateByUrl('/profile')

}

    
logout(){
  this.auth.logoutUser().then(()=>{
    this.rout.navigateByUrl('login');
  })
  }

  async openModal(CheckNumber, obj) {

    this.auth.addTattoo = false;
    this.auth.editButton = false;
    this.auth.myObj.obj.categories = "";
      this.auth.myObj.obj.priceRange = "";
      this.auth.myObj.obj.description = "";
      this.auth.myObj.obj.image = "";
      this.auth.myObj.obj.name = "";
      this.auth.myObj.obj.docid = "";

    if(CheckNumber == 1){

    

      this.auth.myObj.obje = {};
      this.auth.addTattoo = true;
   this.auth.myObj.Button = "Add Tattoo";


      const modal = await this.modalController.create({
        component: TattooPage
      });
      return await  modal.present();

    }else{
     
      this.auth.editButton = true;
      this.auth.myObj.obje = {};
      this.auth.myObj.Button = "Edit";

  

      this.auth.myObj.obj.categories = obj.categories;
      this.auth.myObj.obj.priceRange = obj.pricerange;
      this.auth.myObj.obj.description = obj.description;
      this.auth.myObj.obj.image = obj.image;
      this.auth.myObj.obj.name = obj.name;
      this.auth.myObj.obj.docid = obj.docid;

    
      
      const modal = await this.modalController.create({
        component: TattooPage
      });
      return await  modal.present();

    }
      
    }

    async DeleteData(tattoo) {

      const alert = await this.alertCtrl.create({
        header: 'DELETE!',
        message: '<strong>Are you sure you want to delete this tattoo?</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          }, {
            text: 'Delete',
            handler: data => {
              this.db.collection("Tattoo").doc(tattoo.docid).delete();
              
            }
          }
        ]
      });
  
      await alert.present();
 
    }

    edit(item){
     
    }
   
    
  
  
    }
    
    
    
    




