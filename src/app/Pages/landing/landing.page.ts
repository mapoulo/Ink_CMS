import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ModalController, AlertController } from '@ionic/angular';
import { TattooPage } from '../tattoo/tattoo.page';
import { AuthenticationService } from 'src/app/services/authentication.service';


import { Chart } from 'chart.js';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
 


  
  @ViewChild('barChart',  { static: false }) barChart;

  bars: any;
  colorArray: any;
  tattoo = {
    name: '',
    pricerange: '',
    description: '',
    image: '',
    categories:''
    
  }
  // @ViewChild('barChart', {static: false}) barChart;

db = firebase.firestore();
Tattoos = [];
MyValue: boolean;
MyValue1: boolean;
  num: number;
  docId: string;
  isAdmin: any;

  constructor(public rout : Router,private auth: AuthenticationService, public modalController: ModalController, public alertCtrl: AlertController) { }


  ionViewDidEnter() {
    this.createBarChart();
  }


  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: 'Viewers in millions',
          data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
          backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
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

    edit(item){
     
    }
  //   createBarChart() {
  //     ​
  //         this.charts = new Chart(this.barChart.nativeElement, {
  //           type: 'line',
  //           data: {
  //             labels: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
  //             datasets: [{
  //               label: 'bookings received per day',
  //               // data: [this.mon.length, this.tue.length, this.wed.length, this.thu.length, this.fri.length, this.sat.length, this.sun.length],
  //                data: [this.mon.length, this.tue.length, this.wed.length, this.thu.length, this.fri.length, this.sat.length, this.sun.length],
  //               backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
  //               borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
  //               borderWidth: 1
  //             }]
  //           },
            
  //     ​
  //           options: {
  //             scales: {
  //               yAxes: [{
  //                 ticks: {
  //                   beginAtZero: true
  //                 }
  //               }]
  //             }
  //           }
  //         });
  //   }
  //         getRequests() {
  //           ​
  //               this.db.collection('bookings').where('schooluid', '==',firebase.auth().currentUser.uid).onSnapshot(res => {
  //               console.log(res);
  //               this.mon = [];
  //               this.tue = [];
  //               this.wed = [];
  //               console.log('wednday',  this.wed)
  //               this.thu = [];
  //               this.fri = [];
  //               this.sat = [];
  //               this.sun = [];
  //                 res.forEach(doc => {
                   
  //                   let date = doc.data().datecreated
  //                   let newDate = date.split(" ")
                   
                    
  //                   if (newDate[0] == "Mon") {
  //                     this.mon.push(doc.data())
  //                   } else if (newDate[0] == "Tue") {
  //                     this.tue.push(doc.data())
  //                   }else if (newDate[0] == "Wed") {
  //                     this.wed.push(doc.data())
  //                   }
  //                   else if (newDate[0] == "Thu") {
  //                     this.thu.push(doc.data())
  //                     console.log("The new Date is",this.thu.length);
  //                   }
  //                   else if (newDate[0] == "Fri") {
  //                     this.fri.push(doc.data())
  //                   }
  //                   else if (newDate[0] == "Sat") {
  //                     this.sat.push(doc.data())
  //                   }
  //                   else if (newDate[0] == "Sun") {
  //                     this.sun.push(doc.data())
  //                   }
  //                 })
  //                 this.createBarChart();
  //                 console.log(this.mon);
                  
  //               })
  //           ​
  //         }
        
            
  //     ionViewWillEnterc() {
   
  //       console.log("bookings", this.data.DeclinedData);
  //       this.mon = [];
  //       this.tue = [];
  //       this.wed = [];
  //       this.thu = [];
  //       this.fri = [];
  //       this.sat = [];
  //       this.sun = [];
  //       console.log('Monday array',this.mon);
        
  //       this.platform.ready().then(() => {
  //         console.log('Core service init');
  //         const tabBar = document.getElementById('myTabBar');
  //          tabBar.style.display = 'flex';
  //       });
  //   ​
  //       this.db.collection('Bookings').onSnapshot(snapshot => {
  //         this.Data = [];
  //         this.NewData = [];
         
  //         snapshot.forEach(Element => {
           
  //               this.Data.push(Element.data());
      
  //         });
  //     ​
  //   ​
    
  //   })
  // }
}  
    