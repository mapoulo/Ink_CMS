
import { MultiFileUploadComponent } from './../../components/multi-file-upload/multi-file-upload.component';
import { DataService } from './../../data.service';
import { Component, OnInit,  ViewChild} from '@angular/core';
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

email=""
 db = firebase.firestore();
 Admin = [];
  profile:{




}
  toastCtrl: any;
 
  storage = firebase.storage().ref();
  constructor(public rout : Router,private auth: AuthenticationService,private plt: Platform,public modalController: ModalController,) { }

  ngOnInit() {

    setTimeout(() => {
      this.loader = false;
    }, 2000);

    console.log(this.pdf);
    
  }

  goToNotificationsPage(){

    this.rout.navigateByUrl('/notifications')

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

