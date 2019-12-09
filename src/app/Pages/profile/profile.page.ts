import { DataService } from './../../data.service';

import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { ModalController} from '@ionic/angular';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 loader = true;
 pdf;

 pdfObj = null;
 tattoo = {
  name: '',
  pricerange: '',
  description: '',
  image: '',
  categories:''
  
}

image1  = ""

email=""
 db = firebase.firestore();
 Admin = [];
  profile:{




}
  toastCtrl: any;
  notifications : number = 0;
 
  storage = firebase.storage().ref();
  constructor(public data : DataService, public rout : Router,private auth: AuthenticationService,private plt: Platform,public modalController: ModalController,) { }

  ngOnInit() {

    this.db.collection("Admin").onSnapshot(data => {
      data.forEach(item => {
        this.image1 = item.data().image;
      })
    })

 

    this.notifications = this.data.notification

    setTimeout(() => {
      this.loader = false;
    }, 2000);

    console.log(this.pdf);
    
  }

  goToNotificationsPage(){

    this.rout.navigateByUrl('/notifications')

}

image(event){
 

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



  logout(){
    this.loader = true;
    this.auth.logoutUser().then(()=>{
      this.rout.navigateByUrl('login');
      setTimeout(() => {
        this.loader = false;
      }, 4000);
    })
    }


    ionViewWillEnter(){

      this.email=firebase.auth().currentUser.email;

      this.db.collection("Admin").onSnapshot(data => {
        this.Admin = [];
        data.forEach(item => {
          if(item.exists){
            if(item.data().email === this.email){
              
             this.Admin.push(item.data());
            
            }
          }
        })
      })
    

  
    }


    

  async  createModal(){

    }



    
   

    async presentModal() {
      const modal = await this.modalController.create({
        component: EditProfilePage
      });
      return await modal.present();
    }
    
  }

