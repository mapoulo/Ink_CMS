import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 loader = true;
 pdf;
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

}
