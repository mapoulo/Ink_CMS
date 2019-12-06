import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { TattooPage } from '../tattoo/tattoo.page';
import { AuthenticationService } from 'src/app/services/authentication.service';


import { Chart } from 'chart.js';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
 


  
  // @ViewChild('barChart',  { static: false }) barChart;
  Accepted = []

  bars: any;
  colorArray: any;
  tattoo = {
    name: '',
    pricerange: '',
    description: '',
    image: '',
    categories:''
    
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
  constructor(private platform: Platform,public rout : Router,private auth: AuthenticationService, public modalController: ModalController, public alertCtrl: AlertController) { }


  ionViewDidEnter() {
 

  
  }


  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels:['All bookings', 'Accepted', 'Declined','All users'], 
        datasets: [
          {
          label: ['All bookings'] ,
          data: [this.o ],
          backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 2,
        },

        {
          label: ['Accepted'] ,
          data: [this.n],
          backgroundColor: 'green', // array should have same number of elements as number of dataset
          borderColor: 'green',// array should have same number of elements as number of dataset
          borderWidth: 2
        },


        {
          label: ['Declined'] ,
          data: [this.p],
          backgroundColor: 'red', // array should have same number of elements as number of dataset
          borderColor: 'red',// array should have same number of elements as number of dataset
          borderWidth: 2
        },
        {
          label: ['All users'] ,
          data: [this.r],
          backgroundColor: 'blue', // array should have same number of elements as number of dataset
          borderColor: 'blue',// array should have same number of elements as number of dataset
          borderWidth: 2
        }
      ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


  

  ngOnInit() {
    
   
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          firebase
            .firestore()
            .doc(`/Admin/${user.uid}`)
            .get()
            .then(AdminSnapshot => {
              this.isAdmin = AdminSnapshot.data().isAdmin;
            });
            
        }
      });
  }
     



 
  obj = {id: null, obj : null}


  ionViewWillEnter(){

    let firetattoo = {
      docid: '',
      name: '',
      pricerange: '',
      description: '',
      image: '',
      categories:''
    }
    


    this.db.collection('Users').where('bookingState', '==','Accepted').onSnapshot(data => {
      data.forEach(item => {
        this.counter.push(item.data());
        this.n += 1
     
        console.log("Array length ", this.n );
        
      })

 this.createBarChart();

    })
 
    this.db.collection('Users').where('bookingState', '==','Decline').onSnapshot(data => {
      data.forEach(item => {
        this.count.push(item.data());
        this.p += 1
     
        console.log("Array length ", this.p );
        
      })

 this.createBarChart();

    })
 
  
    this.db.collection("Bookings").onSnapshot(data => {
      data.forEach(item => {
        this.county.push(item.data());
        this.r += 1
     
        console.log("Array length ", this.r );
        
      })

 this.createBarChart();

    })
 
    this.db.collection("Users").onSnapshot(data => {
      data.forEach(item => {
        this.county.push(item.data());
        this.o += 1
     
        console.log("Array length ", this.o );
        
      })

 this.createBarChart();

    })

    this.db.collection('Tattoo').onSnapshot(data => {
      this.Tattoos = [];
      data.forEach(item => {
        firetattoo.categories = item.data().categories;
        firetattoo.name = item.data().name;
        firetattoo.pricerange = item.data().pricerange;
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
          categories:''
        }
      })
      
    })


   this.db.collection("Users").onSnapshot(data => {
     data.forEach(item => {
       
       if(item.data().bookingState === "Accepted"){
        console.log("Users ", item.data() );
        this.Accepted.push(item.data())
       }
      
       
     })
   })

  }


  goToNotificationsPage(){

    this.rout.navigateByUrl('/notifications')
}


goProfilePage(){
  this.rout.navigateByUrl('/profile')

 

}




  async openModal(CheckNumber, obj) {

    this.auth.addTattoo = false;
    this.auth.editButton = false;
    this.auth.myObj.obj.categories = "";
      this.auth.myObj.obj.priceRange = "";
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
      this.auth.myObj.obj.priceRange = obj.pricerange;
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
              this.db.collection("Tattoo").doc(tattoo.docid).delete();
              
            }
          }
        ]
      });
  
      await alert.present();
 
    }

    
}  
    