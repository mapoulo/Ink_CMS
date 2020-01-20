import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController,Platform } from '@ionic/angular';
import { formatDate } from '@angular/common';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import * as moment from 'moment';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  db = firebase.firestore();
notifications : number = 0;
  index : number;

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  name: string = "Nkwe";
  surname: string = "Mapoulo";

  price = "";

  NewName: string;
  NewSurname: string;

  minDate = new Date().toISOString();

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  lockSwipeToPrev;

  @ViewChild(CalendarComponent, { static: false }) myCal: CalendarComponent;


  Bookings = [];
  // number;
  ClickedObjeck = {description: "", name : ""};
  MyArray = [];

  obj = {
    bookingState : '',
    breadth : '',
    category : '',
    customerName : '',
    description : '',
    image : '',
    length : '',
    priceRange : '',
    number:'',
    tattoName : '',
    uid : '',
    auId : ''
  };

  constructor(public alertController:AlertController,  public data : DataService,private callNumber: CallNumber,private platform: Platform,private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,public rout : Router) { }

  ionViewWillEnter() {
    

    
   
    

    let id = {docid: "", auId: "",  obj : {}};
  let autId = "";
 
   this.db.collection('Bookings').onSnapshot(res => {

    res.forEach(e => {
      id.docid = e.id;
      id.obj = e.data();
      this.MyArray.push(id);
      id = {docid: "", auId: "", obj : {}};

      console.log("wwwwwwwwwwww", this.MyArray);
    })


   
    this.MyArray.forEach(item => { 

    
     //this.Bookings=[];
     this.db.collection("Bookings").doc(item.docid).collection("Requests").onSnapshot(i => {
      this.notifications = 0;
      this.Bookings = []
      i.forEach(o => {
      
        if(o.data().bookingState === "waiting"){
          //  Bookingid.docid = o.id;
          //  Bookingid.obj = o.data();
          //  console.log("uuuuuuuuuuuuuuuu",o.id);
          id.obj = o.data();
          id.auId = o.id;
         
           this.notifications += 1;
          this.Bookings.push(id);
          id = {docid: "", auId: "", obj : {}};
          console.log("ttttttttttttt", this.Bookings);

        }
      
      })

     })
   })


   })
  }

  ngOnInit() {

    this.resetEvent();
    this.onCurrentDateChanged(new Date());
  }

  goToNotificationsPage(){
    this.rout.navigateByUrl('/notifications')
}

  save(obj, i){
    

    this.index = i;

    this.obj = obj;
    this.obj.description = obj.obj.description;
    this.obj.image = obj.obj.image;
    this.obj.length = obj.obj.length;
    this.obj.priceRange = obj.obj.priceRange;
    this.obj.number=obj.obj.number;
    this.obj.tattoName = obj.obj.tattoName;
    this.obj.customerName = obj.obj.customerName;
    this.obj.bookingState = obj.obj.bookingState;
    this.obj.category = obj.obj.category;
    this.obj.breadth = obj.obj.breadth;
    this.obj.uid = obj.obj.uid;
    this.obj.auId = obj.auId;
    console.log("save button clicked", this.obj);

    console.log("index", this.Bookings[i]);


  }


  call(numbers){
    console.log("Your Numbers ", numbers);
    
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
  async addEvent() {


let diffrDays = 0; 
console.log(this.event.startTime.slice(0, 10) < this.event.endTime.slice(0, 10));
let date = new Date(Date.now());


console.log("My date is", moment().format().slice(0, 10));

    if( this.event.startTime.slice(0, 10)<= this.event.endTime.slice(0, 10) && moment().format().slice(0, 10) <= this.event.startTime.slice(0, 10) ){

      if(this.obj.customerName != "" && this.price !== ""){

        console.log("This start time ",this.event.startTime);
        console.log("End time ", this.event.endTime);
        console.log("5555555555", this.obj);

        var eventStartTime = new Date(this.event.startTime);
    var eventEndTime = new Date(this.event.endTime);
    var diff = Math.abs(eventStartTime.getTime() - eventEndTime.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));  
    console.log("days" ,diffDays)
    diffrDays = diffDays
  
        this.db.collection("Bookings").doc(this.obj.uid).collection("Requests").doc(this.obj.auId).update({
          bookingState : "Accepted",
          description : this.obj.description,
          image : this.obj.image,
          length : this.obj.length,
          pricerange : this.obj.priceRange,
          
          tattoName : this.obj.tattoName,
          customerName : this.obj.customerName,
          category : this.obj.category,
          breadth : this.obj.breadth,
          uid : this.obj.uid,
          auId : this.obj.auId,
          number: this.obj.number
         
        })
          
        this.db.collection("Bookings").doc(this.obj.uid).collection("Response").doc(this.obj.auId).set({
           startingDate : this.event.startTime,
           endingDate : this.event.endTime,
           price : this.price,
           uid : this.obj.uid,
           bookingState : "Pending",
           auId : this.obj.auId,
           image : this.obj.image,
           days : diffrDays,
           number: this.obj.number,
           customerName : this.obj.customerName
  
        })
  
  
      
  
  
        const alert = await this.alertCtrl.create({
          header: 'Respond sent',
          message: '',
          buttons: [
            {
              text: '',
              role: '',
              cssClass: '',
              handler: (blah) => {
             
              }
            }, {
              text: 'Ok',
              handler: () => {
               
                setTimeout(() => {
                  this.Bookings.splice(this.index, 1);
                },2000);
  
              }
            }
          ]
        });
    
        await alert.present();
  
      }else{
        console.log("Please select a notification");
        const alert = await this.alertController.create({
          header: '',
          subHeader: '',
          message: 'Please enter price.',
          buttons: ['Ok']
        });
    
        await alert.present();
      }
 
    }else{

     
      const alert = await this.alertController.create({
        header: '',
        subHeader: '',
        message: 'Please select the correct dates.',
        buttons: ['Ok']
      });
  
      await alert.present();
    }


   
  
  }

  home(){
    this.rout.navigateByUrl('/landing')
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

  onCurrentDateChanged(event:Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
   

 
  }

}
