import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 loader = true;
 pdf;


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
