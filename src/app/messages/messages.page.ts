import { Component, OnInit, Renderer2, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  itemDiv: any = document.documentElement.getElementsByClassName('item');
  contentMessages: any = document.getElementsByClassName('content-messages');

  key = ''
  uid = ''
  response = ""
  messages = 0;
  fonts = 0;
  MessagesId = [];
  messageInfo = {
    name: '',
    email: '',
    message: '',
    time: ''
  };
  MyMessages = [];
  AllMessages = 0;
  ReadMessages = 0;
  unReadMessages = 0;

  Names = []
  NamesSorted = []

  db = firebase.firestore();
  active;
  constructor(private render: Renderer2, public alertController: AlertController, public modalController: ModalController) {

    

  }

  back() {
    this.render.setStyle(this.contentMessages[0], 'display', 'none');
    this.messageInfo = {
      name: '',
      email: '',
      message: '',
      time: ''
    };
  }


check(){

let str1 = new String( "This" );
  
let index = str1.localeCompare( "This "); 
console.log("localeCompare first :" + index );

  }

  ngOnInit() {

    

    this.db.collection("Message").orderBy('time', 'desc').onSnapshot(data => {

      this.Names = []
      let index = 0
      let obj = {name : "", uid : ""}
  
       data.forEach(item => {
  
         if(item.data().name != "" && item.data().name != undefined && item.data().name != null){
      
          obj.name = item.data().name
        
          obj.uid = item.data().uid               
          this.Names.push(obj)
          obj = {name : "", uid : ""}   


 
         } 
                       
       })
  
     
       const  data1 =  this.Names


       const finalOut = []


       data1.forEach((value) => {
           if (!finalOut.some(x=> (x.name === value.name || x.uid === value.uid))) 
         {
               finalOut.push(value)
               
           }
       })
           
           console.log("testing",finalOut);
           finalOut.forEach(item => {
             this.NamesSorted.push(item)
           })
           console.log("data ",  this.NamesSorted);
           

  
     })

  


  




            
             

    // this.db.collection('Message').orderBy('time', 'desc').onSnapshot(data => {

    //   this.MyMessages = [];
    //   this.unReadMessages = 0;
    //   this.ReadMessages  = 0;
    //   this.AllMessages = 0;

    //   let obj = {obj: {}, id: '', stat: ''};
    //   data.forEach(item => {

    //     obj.obj = item.data();
    //     obj.id = item.id;
    //     obj.stat = item.data().status;
       

    //     if(item.data().cmsUid != null){
    //       this.AllMessages += 1;
    //     }

    //     if(item.data().cmsUid != null){
    //       this.MyMessages.push(obj);
    //     }
       
      
        
    //     // tslint:disable-next-line: triple-equals
    //     if (item.data().status == 'NotRead' && item.data().cmsUid != null) {
    //       this.unReadMessages += 1;
    //     } else if(item.data().cmsUid != null) {
    //        this.ReadMessages += 1;
    //     }


    //     obj = {obj: {}, id: '', stat: ''};
    //   });
    // });


  }

  ionViewDidEnter() {

  }


  async Respond(){

   
    this.db.collection("Message").doc().set({
      message : this.response,
       uid : this.uid,  time : moment().format('MMMM Do YYYY, h:mm:ss a'),
    cmsUid : null ,
    status : "NotRead"
  })


  const alert = await this.alertController.create({
    header: '',
    subHeader: '',
    message: 'Message Sent',
    buttons: [ 'Ok']
  });

  await alert.present();
  }



  updateMessage(uid) {


    this.db.collection("Message").orderBy('time', 'desc').onSnapshot(
      data => {
        data.forEach(item => {
          if(item.data().uid == uid){
            console.log('Your data is here ', item.data());
            
          }
        })
      }
    )


    // this.uid = uid;
    // this.key = key;

    // this.active = i;

    // this.messageInfo.name = data.name;
    // this.messageInfo.message = data.message;
    // this.messageInfo.email = data.email;
    // this.messageInfo.time = data.time;


    // this.render.setStyle(this.contentMessages[0], 'display', 'flex');

    // this.db.collection('Message').doc(key).set({status: 'Read' }, {merge : true});
    // console.log('Message updated');

  }


  async deleteMessage() {

    console.log('Key ', this.uid);



    this.db.collection('Message').doc(this.uid).delete();
    console.log('Message Deleted');


    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: 'Message Deleted',
      buttons: [ 'Ok']
    });

    await alert.present();

    this.messageInfo = {
      name: '',
      email: '',
      message: '',
      time: ''
    };


  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  }
