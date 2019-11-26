import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  thatobabe;

  constructor(public rout : Router) { }

  ngOnInit() {
    
  }

  goToNotificationsPage(){
      this.rout.navigateByUrl('/notifications')
  }

}
