import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController,Platform } from '@ionic/angular';
import { formatDate } from '@angular/common';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { stringify } from 'querystring';

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

  price : number ;

  NewName: string;
  NewSurname: string;

  minDate = new Date().toISOString();

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
 
  };


  lockSwipeToPrev;

  @ViewChild(CalendarComponent, { static: false }) myCal: CalendarComponent;


  

  Bookings = [];
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
    tattoName : '',
    uid : '',
    auId : ''
  };
  tattooForm : FormGroup;
  validation_messages = {
    'Price': [
      { type: 'required', message: 'Price  is required.' },

    ],
    
  }
      
      
  constructor(private fb: FormBuilder,public alertController:AlertController, public data : DataService,private callNumber: CallNumber,private platform: Platform,private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,public rout : Router) { 
    
    this.tattooForm = this.fb.group({
      price: new FormControl('', Validators.compose([Validators.required])),
   
    })
  
  }

  ionViewWillEnter() {


   
    

    this.notifications = this.data.notification

    let id = {docid: "", auId: "",  obj : {}};
  let autId = "";
 
   this.db.collection('Bookings').get().then(res => {
     res.forEach(e => {
       id.docid = e.id;
       id.obj = e.data();
       this.MyArray.push(id);
       id = {docid: "", auId: "", obj : {}};

       console.log("wwwwwwwwwwww", this.MyArray);
     })

     this.MyArray.forEach(item => { 
      this.db.collection("Bookings").doc(item.docid).collection("Requests").get().then(i => {
        i.forEach(o => {
          
          if(o.data().bookingState === "waiting"){
           
            id.obj = o.data();
            id.auId = o.id;
           
             
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
  /*  */
  }

  goToNotificationsPage(){
    this.rout.navigateByUrl('/notifications')
}

  save(obj, i){


    this.slideBack()
    

    this.index = i;

    this.obj = obj;
    this.obj.description = obj.obj.description;
    this.obj.image = obj.obj.image;
    this.obj.length = obj.obj.length;
    this.obj.priceRange = obj.obj.priceRange;
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
  
callNow(number) {
  this.platform.ready().then(() => {
  if (this.platform.is('cordova')){
  this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
}else {
  console.log('you are calling now');
  this.alert() 
}
})
}
async alert(){
  const alert = await this.alertController.create({
    header: 'Calling',
    subHeader: 'Call funcion is not supported on the browser ',

    buttons: [{
      text: 'Ok',
      role: 'Ok',
      cssClass: 'secondary',
      handler: (result) => {
        
      
      }
    }]
  });
  await alert.present();
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


  
  async addEvent() {
    if (this.tattooForm.valid ) {
    if(this.obj.customerName != ""){

      console.log("This start time ",this.event.startTime);
      console.log("End time ", this.event.endTime);
      console.log("5555555555", this.obj);

      this.db.collection("Bookings").doc(this.obj.uid).collection("Requests").doc(this.obj.auId).update({
        bookingState : "Accepted",
        description : this.obj.description,
        image : this.obj.image,
        length : this.obj.length,
        priceRange : this.obj.priceRange,
        tattoName : this.obj.tattoName,
        customerName : this.obj.customerName,
        category : this.obj.category,
        breadth : this.obj.breadth,
        uid : this.obj.uid,
        auId : this.obj.auId,
      })
    }
      this.db.collection("Bookings").doc(this.obj.uid).collection("Response").doc(this.obj.auId).set({
         startingDate : this.event.startTime,
         endingDate : this.event.endTime,
         price : this.price,
         uid : this.obj.uid,
         bookingState : "Pending",
         auId : this.obj.auId,
         image : this.obj.image,

      })
      this.tattooForm.reset()
    
    


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
    var today = new Date(0);
    today.setHours(0, 0, 0, 0);
   

 
  }


  slideBack() {
    this.myCal.onCurrentDateChanged.subscribe((date) => {
      console.log(date);
        
    })
  }

}
