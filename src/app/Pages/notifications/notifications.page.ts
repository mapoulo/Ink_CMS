import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  db = firebase.firestore();
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  name: string = "Nkwe";
  surname: string = "Mapoulo";

  NewName: string;
  NewSurname: string;

  minDate = new Date().toISOString();

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  @ViewChild(CalendarComponent, { static: false }) myCal: CalendarComponent;


  Bookings = [];
  ClickedObjeck = {description: "", name : ""};
  MyArray = [];

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,public rout : Router) { }

  ionViewWillEnter() {

    let id = {docid: "", obj : {}};

   this.db.collection('Tattoo').get().then(res => {
     res.forEach(e => {
       id.docid = e.id;
       id.obj = e.data();
       this.MyArray.push(id);
       id = {docid: "", obj : {}};

       console.log("wwwwwwwwwwww", this.MyArray);
     })

     this.MyArray.forEach(item => { 
      this.db.collection("Tattoo").doc(item.docid).collection("One").get().then(i => {
        i.forEach(o => {
          console.log("ttttttttttttt", o.data());
          this.Bookings.push( o.data())
        })
      })
    })
   })

  }

  ngOnInit() {
    this.resetEvent();
  }


  displayData(item){
    console.log("Item ", item);
    
   this.ClickedObjeck.name = item.name;
   this.ClickedObjeck.description = item.description;
  }
  goProfilePage(){
    this.rout.navigateByUrl('/profile')
  
  }
  

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  takeData() {
    this.NewName = this.name;
    this.NewSurname = this.surname;
  }

  dd() {
    this.db.collection('Tattoo').doc().collection('One').doc().set({
      name: "Lesiba",
      surname: "Mabe",
    })
  }


  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  // Change current month/week/day
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

}
