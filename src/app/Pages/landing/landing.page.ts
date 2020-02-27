import { DataService } from './../../data.service';
import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ModalController, AlertController, Platform, IonSlides } from '@ionic/angular';
import { TattooPage } from '../tattoo/tattoo.page';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Chart } from 'chart.js';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { MessagesPageModule } from 'src/app/messages/messages.module';
import { MessagesPage } from 'src/app/messages/messages.page';
import { Storage } from '@ionic/storage';
// import { start } from 'repl';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
 
  
  // @ViewChild('barChart',  { static: false }) barChart;
  
  messages = 0
  category: string = 'accepted'
  MyMessages = [];
  graph: boolean = false;
  graphDiv = document.getElementsByClassName('gragh-container');
  Accepted = [];
  AcceptedLength=0;
  Decline = [];
  declinedLength=0;
  notifications = 0;

   UnreadMessages = []
  
  active: any;
  bars: any;
  colorArray: any;
  tattoo = {
    name: '',
    pricerange: '',
    description: '',
    image: '',
    categories:'',
    start:'',
    end:''
    
  }
   @ViewChild('barChart', {static: false}) barChart;
db = firebase.firestore();
Tattoos = [];
  num: number;
  docId: string;
  isAdmin: any;
  count=[];
  county=[];

  Declined = []
   
  image1 = ""
  counter  = [];
  n : number = 0;
  p: number = 0;
  r : number = 0;
  o: number = 0;
  number : number = 0;
  onboard: boolean  = false;
  @ViewChild('slides', {static: false}) slides: IonSlides;
  fullscreen: boolean = false;
  fullScreenImage: any;
  constructor(public data : DataService, private platform: Platform, public AlertController:AlertController,private store: Storage, private render: Renderer2, private callNumber: CallNumber,public rout : Router,private auth: AuthenticationService, public modalController: ModalController, public alertCtrl: AlertController) {

 

   }

   viewTattoo(i) {
     this.active = i;
     console.log('kjasdbjkasbdas khuthy',i);
     
   }

   

   showGraph() {
     this.graph = !this.graph;
     if(this.graph) {
      this.render.setStyle(this.graphDiv[0], 'display', 'block');
     }else {
       if(this.platform.width() <= 600) {
        this.render.setStyle(this.graphDiv[0], 'display', 'none');
       }else {
        this.render.setStyle(this.graphDiv[0], 'display', 'block');
       }
      
     }
   }



   
  ionViewDidEnter() {


    this.db.collection("Response").onSnapshot(data => {
      this.Accepted = []
      data.forEach(item => {
        if(item.data().bookingState == "Accepted"){
            this.Accepted.push(item.data())
        }
      })
    })


    this.db.collection("Response").onSnapshot(data => {
      this.Declined = []
      data.forEach(item => {
        if(item.data().bookingState == "Declined"){
            this.Declined.push(item.data())
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
 


    this.store.get('onboard').then((val) => {
      if(val == true) {
        this.onboard = false;
      }else {
        this.onboard = true;
      }
    });
 
 

    
 
 
    let MyArray = [];
    let Bookings = [];
    let id = {docid: "", auId: "",   obj : {}};
    let autId = "";
    
   
     this.db.collection('Bookings').onSnapshot(res => {
      res.forEach(e => {
        id.docid = e.id;
        id.obj = e.data();
        MyArray.push(id);
        id = {docid: "", auId: "", obj : {}};
 
 
      
      })
 
     
     
      
      MyArray.forEach(item => { 
       this.db.collection("Bookings").doc(item.docid).collection("Requests").onSnapshot(i => {
       
      

        i.forEach(o => {
           
         
          if(o.data().bookingState === "waiting"){

             id.obj = o.data();
             id.auId = o.id;
      

            Bookings.push(id);
            id = {docid: "", auId: "", obj : {}};
          }
        
        })
       })
     })
     })

     
    let firetattoo = {
      docid: '',
      name: '',
      pricerange: '',
      description: '',
      image: '',
      categories:'',
      startPrice:'',
      endPrice:''
    }
    
    this.db.collection('Response').where('bookingState', '==','Accepted').onSnapshot(data => {
      this.n = data.size;
      console.log('number',this.n);
      
    this.createBarChart();
    })
 
    this.db.collection('Response').where('bookingState', '==','Declined').onSnapshot(data => {
      this.p = data.size;
      console.log('number',this.p);
      this.createBarChart();
    })
 
  
    this.db.collection("Response").onSnapshot(data => {
      this.r = data.size;
      console.log('number',this.r);
      this.createBarChart();
    })
 
    this.db.collection("Response").onSnapshot(data => {
      data.forEach(item => {
        this.county.push(item.data());
        this.o += 1
     
      
        
      })
 this.createBarChart();
    })
    this.db.collection('Tattoo').onSnapshot(data => {
      this.Tattoos = [];
      data.forEach(item => {
        firetattoo.categories = item.data().categories;
        firetattoo.name = item.data().name;
        firetattoo.startPrice = item.data().startPrice;
        firetattoo.endPrice = item.data().endPrice;
        firetattoo.categories = item.data().categories;
        firetattoo.image = item.data().image;
        firetattoo.docid = item.id;
        firetattoo.description = item.data().description;
        this.Tattoos.push(firetattoo)
        firetattoo = {
          docid: '',
          name: '',
          pricerange: '',
          description: '',
          image: '',
          categories:'',
          startPrice:'',
          endPrice:''
        }
      })
      
    })


  //  this.db.collection("Users").onSnapshot(data => {
  //    this.Accepted = [];
  //    this.AcceptedLength=0;
  //    data.forEach(item => {
       
  //      if(item.data().bookingState === "Accepted"){
       
        
       
  //       this.Accepted.push({id: item.id, data: item.data()})
  //       this.AcceptedLength =  this.Accepted.length;
  //      }
      
       
  //    })
  //  })  


   this.db.collection("Users").onSnapshot(data => {
    this.Decline = [];
    this.declinedLength=0;
    data.forEach(item => {
      
      if(item.data().bookingState === "Decline"){

       this.Decline.push({id: item.id, data: item.data()})
       console.log("data ", this.Decline);
       
       this.declinedLength=this.Decline.length;
      }
     
      
    })
  })
   
      // firebase.auth().onAuthStateChanged(user => {
      //   if (user) {
      //     firebase
      //       .firestore()
      //       .doc(`/Admin/${user.uid}`)
      //       .get()
      //       .then(AdminSnapshot => {
      //         this.isAdmin = AdminSnapshot.data().isAdmin;
      //       });
            
      //   }
      // });

  
  }

  onboardingFunc() {
    this.onboard = false;
    this.store.set('onboard', true);
  }
  onNext() {
    this.slides.slideNext();
  
  }

  animateClose(image) {
    this.fullScreenImage = image;
    this.fullscreen = !this.fullscreen;
  }


  createBarChart() {
    Chart.defaults.global.defaultFontSize = 11;
    
    
    this.bars = new Chart(this.barChart.nativeElement, {
         type: 'line',
    data: {
        labels: ['A-B', 'D-B', 'AC-B', 'A-U'],
        
        datasets: [{
            label: 'Ink Scribe Tattoo-Analytics',
            data: [this.r, this.p, this.n, this.o],
            backgroundColor: [
                'rgba(214, 110, 83, 0)', 
                '#F25E5E',
                '#F2D5C4',
                'rgba(242, 149, 68, 0.5)'
                
            ],
            borderColor: [
                'rgba(214, 110, 83, 0.9)'
               
            ],
            borderWidth: 3,
            
        }]
    },
    options: {
     
     
      title: {
        display: true,
        text: 'Bookings made so far.'
    },
        responsive: true,
        maintainAspectRatio: true,
  scales: {
    yAxes: [{
      stacked: false,
      gridLines: {
        display: false,
        color: "rgba(255,99,132,0.2)",
        
      },
      ticks: {
        beginAtZero: true,
        fontFamily: 'Montserrat , sans-serif'
    }
    }],
    xAxes: [{
      gridLines: {
        display: false
      }
    }]
  }
    }
    });
  }


  uids=[]

  ngOnInit() {

    this.db.collection("Bookings").onSnapshot(data => {
      this.notifications = 0
      data.forEach(item => {
        if(item.data().bookingState == "waiting"){
          this.notifications += 1
        }
      })
    })


    this.db.collection("Admin").onSnapshot(data => {
      data.forEach(item => {
        this.image1 = item.data().image;
      })
    })



  }

 async  viewMessages(){

    const modal = await this.modalController.create({
      component: MessagesPage,
      cssClass:'modalMessages'

    });
    return await  modal.present();

  }

  
    call(){
      console.log('number')
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
      const alert = await this.alertCtrl.create({
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
    
 
  obj = {id: null, obj : null}







  goToNotificationsPage(){
this.rout.navigateByUrl('/notifications')
}
gotToLandingPage(){
  this.rout.navigateByUrl('/landing')
  }
goProfilePage(){
  this.rout.navigateByUrl('/profile')
 
}
  async openModal(CheckNumber, obj) {

    console.log("ssss ", obj);
    
    this.auth.addTattoo = false;
    this.auth.editButton = false;
    this.auth.myObj.obj.categories = "";
     
      this.auth.myObj.obj.startPrice = "";
      this.auth.myObj.obj.endPrice = "";
      this.auth.myObj.obj.description = "";
      this.auth.myObj.obj.image = "";
      this.auth.myObj.obj.name = "";
      this.auth.myObj.obj.docid = "";
    if(CheckNumber == 1){
    
      this.auth.myObj.obje = {};
      this.auth.addTattoo = true;
   this.auth.myObj.Button = "Add Tattoo";
      const modal = await this.modalController.create({
        component: TattooPage
      });
      return await  modal.present();
    }else{
     
      this.auth.editButton = true;
      this.auth.myObj.obje = {};
      this.auth.myObj.Button = "Edit";
  
      this.auth.myObj.obj.categories = obj.categories;
   
      this.auth.myObj.obj.startPrice = obj.startPrice;
      this.auth.myObj.obj.endPrice = obj.endPrice;
      this.auth.myObj.obj.description = obj.description;
      this.auth.myObj.obj.image = obj.image;
      this.auth.myObj.obj.name = obj.name;
      this.auth.myObj.obj.docid = obj.docid;
    
      
      const modal = await this.modalController.create({
        component: TattooPage
      });
      return await  modal.present();
    }
      
    }
    async DeleteData(tattoo) {
      console.log(tattoo);
      
      const alert = await this.alertCtrl.create({
        header: 'DELETE!',
        message: '<strong>Are you sure you want to delete this tattoo?</strong>',
        buttons: [
          {
            text: 'Cancel',
            
            handler: data => {
              console.log('Cancel clicked');
            }
          }, {
            text: 'Delete',
            handler: data => {
              this.db.collection("Tattoo").doc(tattoo.docid).delete();
              this.reg1();
            }
          }
        ]
      });
  
      await alert.present();
 
    }
    async DeleteHistory(tattoo) {
      console.log(tattoo);
    
      const alert = await this.alertCtrl.create({
        header: 'DELETE!',
        message: '<strong>Are you sure you want to delete this tattoo?</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            
            handler: data => {
              console.log('Cancel clicked');
            }
          }, {
            text: 'Delete',
            handler: data => {
              this.db.collection("Users").doc(tattoo).delete();
              
            }
          }
        ]
      });
  
      await alert.present();
 
    }
    async reg1(){
      const alert = await this.AlertController.create({
        header: "",
        subHeader: "",
        message: "Tattoo Deleted successfully",
        buttons: ['OK']
      });
      alert.present();
}  
}