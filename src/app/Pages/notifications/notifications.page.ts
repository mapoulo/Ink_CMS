import { MessagesPage } from 'src/app/messages/messages.page';
import { DataService } from './../../data.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, Platform, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import * as moment from 'moment';
import { NotificationsService } from 'src/app/notifications.service';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  db = firebase.firestore();

  messages = 0;
  UnreadMessages = [];
notifications  = 0;
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
  Bookings1 = [];
  // number;
  loader: boolean = false;
  image1="";
  ClickedObjeck = {description: "", name : ""};
  MyArray = [];
  obj = {
    bookingState : '',
    color : '',
    endPrice : '',
    startPrice : '',
    category : '',
    customerName : '',
    description : '',
    image : '',
    sizes : '',
    number:'',
    UserImage : '',
    tattoName : '',
    uid : '',
    auId : ''
  };
  active: any;
  fullscreen = false;
  
 
 
  respond_containerDiv = document.getElementsByClassName('respond-container')
  details_profileDiv = document.getElementsByClassName('details-profile')
  calendar_containerDiv = document.getElementsByClassName('calendar-container');
  respondContainer = false;
  detailsProfile = false;
  calenderContainer = false;
  tattooForm : FormGroup;
  validation_messages = {
    'price': [
      { type: 'required', message: 'Price  is required.' },
    ],
    'startTime': [
      { type: 'required', message: 'start date  is required.' },
    ],
    'endTime': [
      { type: 'required', message: 'end date  is required.' },
    ],
  }
  constructor(private fb: FormBuilder,private render: Renderer2, public modalController: ModalController, public alertController:AlertController, public notification : NotificationsService,  public data : DataService,private callNumber: CallNumber,private platform: Platform,private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,public rout : Router) { 
    this.tattooForm = this.fb.group({
      price: new FormControl('', Validators.compose([Validators.required])),
      endTime: new FormControl('', Validators.compose([Validators.required])),
      startTime: new FormControl('', Validators.compose([Validators.required])),
    })
 
  }
  tt = []
  ionViewWillEnter() {
    this.loader = true;
  


  this.db.collection("Bookings").onSnapshot(data => {
    this.Bookings = []
    let obj = {obj : {}, id : ""}
    data.forEach(item => {
      if(item.data().bookingState == "waiting"){
        obj.obj = item.data()
        obj.id  = item.id
        this.Bookings.push(obj)
        obj = {obj : {}, id : ""}
        console.log("Bookings ", this.Bookings);
        
      }
    })
  })



    



   
     this.loader = false;
  
    
   
    // let id = {docid: "", auId: "",  obj : {}};
    // let autId = "";
   
    //  this.db.collection('Bookings').onSnapshot(res => {
    //   res.forEach(e => {
    //     id.docid = e.id;
    //     id.obj = e.data();
    //     this.MyArray.push(id);
    //     id = {docid: "", auId: "", obj : {}};
    //     console.log("wwwwwwwwwwww", this.MyArray);
    //   })
     
    //   this.MyArray.forEach(item => { 
    //    this.db.collection("Bookings").doc(item.docid).collection("Requests").onSnapshot(i => {
      
    //     this.notifications = 0;
    //     this.Bookings = [] 
       
    //     i.forEach(o => {
         
    //       if(o.data().bookingState === "waiting"){
           
    //         id.obj = o.data();
    //         id.auId = o.id;
           
    //          this.notifications += 1;
             
    //           this.Bookings.push(id);
    //           this.Bookings1 = this.Bookings;
    //           console.log("Your data ",  this.Bookings);
    //         id = {docid: "", auId: "", obj : {}};
           
    //       }
        
         
  
    //     })
    //    })
    //  })
    //  })
    
    
  
     
   
  }
  
ionViewDidEnter(){

  this.db.collection("Bookings").onSnapshot(data => {
    this.notifications = 0
    data.forEach(item => {
      if(item.data().bookingState == "waiting"){
        this.notifications += 1
      }
    })
  })
  
  this.db.collection("Message").onSnapshot(data => {
    this.UnreadMessages = []
    this.messages  = 0
    data.forEach(item => {
     
      if(item.data().status == "NotRead"){
        this.messages += 1
        this.UnreadMessages.push(item.data())
       
      }
      
    })
  })
  
  
}
  ngOnInit() {
    
    this.db.collection("Admin").onSnapshot(data => {
      data.forEach(item => {
        this.image1 = item.data().image;
      })
    })
    this.resetEvent();
    this.onCurrentDateChanged(new Date());
    
    
  }
  goToNotificationsPage(){
    this.rout.navigateByUrl('/notifications')
}
animateClose() {
  this.fullscreen = !this.fullscreen;
   
}
respondFunc() {
  this.respondContainer = !this.respondContainer;
  if(this.respondContainer) {
    this.render.setStyle(this.respond_containerDiv[0], 'display', 'flex');
 
  }else {
    this.render.setStyle(this.respond_containerDiv[0], 'display', 'none');
  }
}
continueFunc() {
  this.render.setStyle(this.details_profileDiv[0], 'display', 'none');
  this.render.setStyle(this.calendar_containerDiv[0], 'display', 'block');
}
cancelFunction() {
  this.render.setStyle(this.details_profileDiv[0], 'display', 'flex');
  this.render.setStyle(this.calendar_containerDiv[0], 'display', 'none');
}
resetValues() {
  
  
  this.render.setStyle(this.respond_containerDiv[0], 'display', 'flex');
  setTimeout(() => {
    this.render.setStyle(this.calendar_containerDiv[0], 'display', 'block');
    this.render.setStyle(this.details_profileDiv[0], 'display', 'flex');
  }, 2000);
}
  save(obj, i, id){
    console.log("ddfsdf ", obj);
    
    this.loader = true;
    
    this.active = i;
    
    this.index = i;
    this.resetValues()
    setTimeout(() => {
      
     /*  this.render.setStyle(this.respond_containerDiv[0], 'display', 'flex'); */
    
      this.respondContainer = true;
      this.obj = obj;
    this.obj.description = obj.description;
    this.obj.image = obj.image;
    this.obj.sizes = obj.sizes;
    this.obj.startPrice = obj.startPrice;
    this.obj.endPrice = obj.endPrice;
    this.obj.number=obj.number;
    this.obj.tattoName = obj.tattoName;
    this.obj.customerName = obj.customerName;
    this.obj.bookingState = obj.bookingState;
    this.obj.category = obj.category;
    this.obj.color = obj.color;
    this.obj.uid = obj.uid;
    this.obj.auId = id;
    this.obj.UserImage = obj.userImage
    console.log("save button clicked", this.obj);
    console.log("index", this.index);
    
      this.event.startTime = "";
      this.event.endTime = "";
      this.price = ""; 
      this.loader = false; 
    }, 1000)
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


    gotToLandingPage(){
      this.rout.navigateByUrl('/landing')
      }

      async  viewMessages(){

        const modal = await this.modalController.create({
          component: MessagesPage,
          cssClass:'modalMessages'
    
        });
        return await  modal.present();
    
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


  


  // Create the right event format and reload source
  async addEvent() {
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
      this.Bookings.splice(this.index, 1);
    }, 2000)
  
   

    let diffrDays = 0; 
console.log(this.event.startTime.slice(0, 10) < this.event.endTime.slice(0, 10));
let date = new Date(Date.now());
console.log("My date is", moment().format().slice(0, 10));
    if( this.event.startTime.slice(0, 10)<= this.event.endTime.slice(0, 10) && moment().format().slice(0, 10) <= this.event.startTime.slice(0, 10) )
    
    if( this.event.startTime.slice(0, 10)<= this.event.endTime.slice(0, 10) && moment().format().slice(0, 10) <= this.event.startTime.slice(0, 10) ){
      var eventStartTime = new Date(this.event.startTime);
          var eventEndTime = new Date(this.event.endTime);
          var diff = Math.abs(eventStartTime.getTime() - eventEndTime.getTime());
          var diffDays = Math.ceil(diff / (1000 * 3600 * 24));  
          console.log("days" ,diffDays)
          diffrDays = diffDays
  

        //   description : this.obj.description,
        // image : this.obj.image,
        // length : this.obj.length,
        // startPrice : this.obj.startPrice,
        // endingDate : this.obj.endPrice,
        // tattoName : this.obj.tattoName,
        // customerName : this.obj.customerName,
        // category : this.obj.category,
        // breadth : this.obj.breadth,
        // uid : this.obj.uid,
        // auId : this.obj.auId,
        // number: this.obj.number
      setTimeout(() => {
        this.db.collection("Bookings").doc(this.obj.auId).set({
          bookingState : "Accepted",
        }, {merge : true})
      }, 2000);
    

      this.db.collection("Response").doc().set({
        startingDate : this.event.startTime,
        endingDate : this.event.endTime,
        price : this.price,
        uid : this.obj.uid,
        bookingState : "Pending",
        auId : this.obj.auId,
        image : this.obj.image,
        days : diffrDays,
        number: this.obj.number,
        customerName : this.obj.customerName,
        tokenId : this.notification.token
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
                this.event.startTime = ""
                this.event.endTime = ""
                this.price = ""     
              
                this.obj = {
                  bookingState : '',
                  sizes : '',
                  category : '',
                  customerName : '',
                  description : '',
                  image : '',
                  color : '',
                 endPrice : '',
                 UserImage : '',
                 startPrice : '',
                  number:'',
                  tattoName : '',
                  uid : '',
                  auId : ''
                };
               
              
                
  
              }
            }
          ]
        });
        
 
     
    
    await alert.present();
   
/* Close Respond container */
this.render.setStyle(this.respond_containerDiv[0], 'display', 'none');
             
     
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



