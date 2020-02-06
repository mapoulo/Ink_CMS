import { Component, OnInit, Renderer2, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import * as firebase from "firebase";
import { AlertController,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  itemDiv: any = document.documentElement.getElementsByClassName('item');
  contentMessages: any = document.getElementsByClassName('content-messages');

  key = ""
  uid = ""
  messages = 0;
  fonts = 0
  MessagesId = [];
  messageInfo = {
    name: '',
    email: '',
    message: '',
    time: ''
  };
  MyMessages = [];
  AllMessages = 0
  ReadMessages = 0
  unReadMessages = 0

  db = firebase.firestore()
  active: number = 0;
  constructor(private render: Renderer2, public alertController: AlertController,public modalController:ModalController) {



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

  ngOnInit() {


    this.db.collection("Message").onSnapshot(data => {
       
      this.MyMessages = []
      this.unReadMessages = 0
      this.ReadMessages  = 0
      this.AllMessages = 0

      let obj = {obj:{}, id: ''}
      data.forEach(item => {

        obj.obj = item.data()
        obj.id = item.id
        console.log("dddd ", item.data());
        
        this.AllMessages += 1

        this.MyMessages.push(obj)
        if(item.data().status == "NotRead"){
          this.unReadMessages += 1
        }else{
           this.ReadMessages += 1
        }

       
        obj = {obj:{}, id:''}
      })
    })
   
    
      
      //   let UidArray = []
        
    
      //  setTimeout(() => {
      //   this.MyMessages = []
      //   this.db.collection("Bookings").get().then( data => {
      //     data.forEach(item => {
      //       UidArray.push(item.id)
           
      //     })
      //   })
        
      //  }, 1000)
      
     
    
    
      //  setTimeout(() => {
          
      //   UidArray.forEach(i => {
      //     console.log("All My keys ", i);
    
    
          
      //     this.db.collection("Messages").doc(i).collection("Message").get().then(data => {

           
      //       data.forEach(i => {
             
      //         console.log("All My messages ", i.data());
      //         this.AllMessages += 1
      //         this.MyMessages.push({keys: i.id, mine: i.data()});
              
    
      //        if(i.data().satatus == "NotRead"){
      //          this.unReadMessages += 1
      //        }
    
      //        if(i.data().satatus == "Read"){
      //          this.ReadMessages += 1
      //        }
      //       })

      //     })
          
      //   })
    
     
      
        
      //  }, 2000) 

    //===============


    // this.db.collection("Bookings").onSnapshot(data => {
    //   data.forEach(i => {

    //          this.db.collection("Messages").doc(i.id).collection("Message").onSnapshot(data => {
    //           this.messages = 0;
    //             // this.MyMessages = [];
    //             this.AllMessages = 0
    //             this.unReadMessages  = 0
    //            data.forEach(item => {

    //             this.AllMessages += 1
    //              if(item.data().satatus == "NotRead"){

    //                this.MyMessages.push({keys: item.id, mine: item.data()});
    //                console.log("Messages ", this.MyMessages );
    //                 this.messages += 1;
    //                 this.unReadMessages += 1

    //              }




    //                   if(item.data().satatus == "Read" ){
    //                           this.ReadMessages += 1
    //                         }


    //            })
    //          })
    //   })
    // })



  }

  ionViewDidEnter() {

  }



  updateMessage(uid, key, data, i) {


    this.unReadMessages = 0
    this.AllMessages = 0
    this.ReadMessages = 0
   

    console.log("Your data is here ", key);
  

    this.uid = uid
    this.key = key

    this.active = i;

    this.messageInfo.name = data.name;
    this.messageInfo.message = data.message;
    this.messageInfo.email = data.email;
    this.messageInfo.time = data.time;

    this.render.setStyle(this.contentMessages[0], 'display', 'flex');


    setTimeout(() => {

  

      this.db.collection("Message").doc(uid).update({ email: data.email, message: data.message, name: data.name, status: "Read" })
      console.log("Message updated");


    }, 1000)



  }


  async deleteMessage() {


    this.db.collection("Messages").doc(this.uid).collection("Message").doc(this.key).delete()
    console.log("Message Deleted");


    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: 'Message Deleted',
      buttons: [ 'Ok']
    });
  
    await alert.present();
    

    let UidArray = []
        

    setTimeout(() => {
   
     this.db.collection("Bookings").get().then( data => {
       data.forEach(item => {
         UidArray.push(item.id)
        
       })
     })
     
    }, 1000)
   
  
 
 
    setTimeout(() => {
       
     UidArray.forEach(i => {
       console.log("All My keys ", i);
 
 
       
       this.db.collection("Messages").doc(i).collection("Message").get().then(data => {

        
         data.forEach(i => {
          
           console.log("All My messages ", i.data());
           this.AllMessages += 1
          
           
 
          if(i.data().satatus == "NotRead"){
            this.unReadMessages += 1
          }
 
          if(i.data().satatus == "Read"){
            this.ReadMessages += 1
          }
         })

       })
       
     })
 
  
   
     
    }, 2000) 
    this.messageInfo = {
      name: '',
      email: '',
      message: '',
      time: ''
    }
    

  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  }
