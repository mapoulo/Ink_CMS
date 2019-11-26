import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ModalController, AlertController } from '@ionic/angular';
import { TattooPage } from '../tattoo/tattoo.page';
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

  constructor(public rout : Router,private modalController: ModalController,public alertCtrl:AlertController) { }

  ngOnInit() {
    
  }

  goToNotificationsPage(){
      this.rout.navigateByUrl('/notifications')
  }
  obj = {id: null, obj : null}
  ionViewWillEnter(){
    let firetattoo = {
      docid: '',
      doc: {}
    }
    this.db.collection('Tattoo').onSnapshot(data => {
      this.Tattoos = [];
      data.forEach(item => {
        firetattoo.doc = item.data();
        firetattoo.docid = item.id;
        this.Tattoos.push(firetattoo)
        firetattoo = {
          docid: '',
          doc: {}
        }
      })
      
    })

  }


  async openModal() {
      const modal = await this.modalController.create({
        component: TattooPage
      });
      return await  modal.present();
    }

    async DeleteData(docid, tattoo) {
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
              this.db.collection("Tattoo").doc(docid).delete();
            }
          }
        ]
      });
  
      await alert.present();

      
    }
   
    
    //  edit(document) {
       
    //   this.tattoo.name = document.doc.name
    //   this.tattoo.pricerange = document.doc.pricerange
    //   this.tattoo.description = document.doc.description
    //   this.tattoo.categories = document.doc.categories
    //   this.tattoo.image = document.doc.image
    //   this.openModal()
    
    // }
  
    }
    
    
    
    




