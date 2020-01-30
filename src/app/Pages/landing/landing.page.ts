import { DataService } from './../../data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
 
  
  // @ViewChild('barChart',  { static: false }) barChart;
  messages = 0
  category: string = 'accepted'
  MyMessages = []
  Accepted = [];
  AcceptedLength=0;
  Decline = [];
  declinedLength=0;
  notifications = 0;
  notifications1 = 0;
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
  counter  = [];
  n : number = 0;
  p: number = 0;
  r : number = 0;
  o: number = 0;
  number : number = 0;
  onboard: boolean  = false;
  @ViewChild('slides', {static: true}) slides: IonSlides;
  constructor(public data : DataService, private platform: Platform, private store: Storage, private callNumber: CallNumber,public rout : Router,private auth: AuthenticationService, public modalController: ModalController, public alertCtrl: AlertController) {

 

   }
  ionViewDidEnter() {




    this.store.get('onboard').then((val) => {
      if(val == true) {
        this.onboard = false;
      }else {
        this.onboard = true;
      }
    });
 
 

    
    // this.db.collection("Messages").onSnapshot(data => {
    //   this.messages = 0;
    //   this.MyMessages = [];
    //   data.forEach(message => {
    //     if(message.data().satatus = "NotRead"){
    //       this.MyMessages.push(message.data());
    //       this.messages += 1;
    //     }
    //   })
    // })
 
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
 console.log("ssssssss");
 
      
      })
 
     
     
      // this.data.notification = 0;
      MyArray.forEach(item => { 
       this.db.collection("Bookings").doc(item.docid).collection("Requests").onSnapshot(i => {
       
        this.notifications = 0;

        i.forEach(o => {
           
         
          if(o.data().bookingState === "waiting"){
            //  Bookingid.docid = o.id;
            //  Bookingid.obj = o.data();
           
             id.obj = o.data();
             id.auId = o.id;
      
           
             this.notifications += 1;
             this.notifications1 = this.notifications
            // this.data.notification += 1;
            console.log( "uuuuuuuuuuuuuuuu", o.data() );
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
      start:'',
      end:''
    }
    
    this.db.collection('Users').where('bookingState', '==','Accepted').onSnapshot(data => {
     
      data.forEach(item => {
        this.counter.push(item.data());
        this.n += 1
     
        
        
      })
    this.createBarChart();
    })
 
    this.db.collection('Users').where('bookingState', '==','Decline').onSnapshot(data => {
      data.forEach(item => {
        this.count.push(item.data());
        this.p += 1
     
      
        
      })
 this.createBarChart();
    })
 
  
    this.db.collection("Bookings").onSnapshot(data => {
      data.forEach(item => {
        this.county.push(item.data());
        this.r += 1
     
     
        
      })
 this.createBarChart();
    })
 
    this.db.collection("Users").onSnapshot(data => {
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
        firetattoo.start = item.data().startPrice;
        firetattoo.end = item.data().endPrice;
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
          start:'',
          end:''
        }
      })
      
    })


   this.db.collection("Users").onSnapshot(data => {
     this.Accepted = [];
     this.AcceptedLength=0;
     data.forEach(item => {
       
       if(item.data().bookingState === "Accepted"){
        console.log("Accepted Booking ",item.data() );
        
       
        this.Accepted.push({id: item.id, data: item.data()})
        this.AcceptedLength =  this.Accepted.length;
       }
      
       
     })
   })  


   this.db.collection("Users").onSnapshot(data => {
    this.Decline = [];
    this.declinedLength=0;
    data.forEach(item => {
      
      if(item.data().bookingState === "Decline"){
       console.log("Accepted Booking ",item.data() );
       
     
       this.Decline.push({id: item.id, data: item.data()})
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
    this.store.set('onboard', true);
  }


  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
         type: 'bar',
    data: {
        labels: ['All Bookings', 'Declined Bookings', 'Accepted Booking', 'All Users'],
        fontSize: '12px',
        datasets: [{
            label: '#-Analytics',
            data: [12, 45, 42, 23],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
                
            ],
            borderColor: [
                'rgba(255, 12, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
               
            ],
            borderWidth: 0
        }]
    },
    options: {
      title: {
        display: true,
        text: 'Bookings made so far.'
    },
      
        maintainAspectRatio: false,
  scales: {
    yAxes: [{
      stacked: true,
      gridLines: {
        display: false,
        color: "rgba(255,99,132,0.2)",
        
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


  
  ngOnInit() {

    let UidArray = []
    

    setTimeout(() => {
     this.db.collection("Bookings").get().then(data => {

      data.forEach(item => {
        UidArray.push(item.id)
       
      })

     })
    }, 1000)
   
  
 
    this.messages = 0;
    setTimeout(() => {
       
     
     UidArray.forEach(i => {
       console.log("All My keys ", i);
 
     
       
       this.db.collection("Messages").doc(i).collection("Message").onSnapshot(data => {
      
      
        
         data.forEach(i => {
          
          if(i.data().satatus == "NotRead"){
            this.messages += 1
          }
           
           
         })
        
       })
       
       
     })
 
  
   
     
    }, 2000)
    

    // this.db.collection("Bookings").onSnapshot(data => {
    //   data.forEach(i => {
    //          this.db.collection("Messages").doc(i.id).collection("Message").onSnapshot(data => {
    //           this.messages = 0;
    //             this.MyMessages = [];
    //            data.forEach(item => {
    //              if(item.data().satatus == "NotRead"){
    //                console.log("Messages ", item.data() );
    //                this.MyMessages.push(item.data());
    //       this.messages += 1;
                   
    //              }
    //            })
    //          })
    //   })
    // })

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

  ionViewWillEnter(){


 
  
  }





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
   
      this.auth.myObj.obj.startPrice = obj.start;
      this.auth.myObj.obj.endPrice = obj.end;
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
    
}  
