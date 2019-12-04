import { MultiFileUploadComponent } from './../../components/multi-file-upload/multi-file-upload.component';

import { DataService } from './../../data.service';
import { Component, OnInit,  ViewChild} from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';







import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  @ViewChild(MultiFileUploadComponent, { static: false }) fileField: MultiFileUploadComponent;

  name: string;
  phoneNumber: string;
  email: string;


  db = firebase.firestore();
  PersonsDetails = {};


 loader = true;
 pdf;


 tattoo = {
  name: '',
  pricerange: '',
  description: '',
  image: '',
  categories:''
  
}
 Admin = [];
  profile:{




}

  constructor(public rout : Router,private auth: AuthenticationService) { }

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
        data.forEach(item => {
          if(item.exists){
            if(item.data().email === this.email){
              
             this.Admin.push(item.data());
            
            }
          }
        })
      })
    

  
    }
    
}
