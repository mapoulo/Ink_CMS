import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  thatobabe;

  constructor(public rout : Router,private auth: AuthenticationService) { }

  ngOnInit() {
    
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
     

}
