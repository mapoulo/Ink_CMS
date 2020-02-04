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
  //   let idArr = [];
  //   this.db.collection('Bookings').get().then((res) => {
  //     //  console.log('My doc',res.docs);
  //      for (let j = 0; j < res.docs.length; j++) {
  //       //  console.log('Info ', res.docs[j].data());
  //       idArr.push(res.docs[j].id)
  //      }
   
  //   })
  //   setTimeout(() => {
  //      idArr.forEach((i)=>{
  //       this.db.collection("Messages").doc(i).collection("Message").onSnapshot((r1)=>{
  //         // console.log('My messages ', r1);
  //         r1.forEach((y) => {
             
  //           console.log("All My messages ", y.data());
  //           this.AllMessages += 1
  //           this.MyMessages.push({keys: y.id, mine: y.data()});
  //       })
  //   })
  // })
  //   }, 1000);
   
    
      
        let UidArray = []
        
    
       setTimeout(() => {
        this.MyMessages = []
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
              this.MyMessages.push({keys: i.id, mine: i.data()});
              
    
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
    this.MyMessages = []

    console.log("Your data is here ", key);
    let UidArray = []

    this.uid = uid
    this.key = key

    this.active = i;

    this.messageInfo.name = data.mine.name;
    this.messageInfo.message = data.mine.message;
    this.messageInfo.email = data.mine.email;
    this.messageInfo.time = data.mine.time;

    this.render.setStyle(this.contentMessages[0], 'display', 'flex');

    //  this.db.collection("Messages").get().then(item => {

    //   item.forEach(data => {
    //      if(key == data.id){
    //        this.db.collection("Messages").doc(key).update({email:data.data().email, message: data.data().message, name : data.data().name, satatus: "Read"})
    //      }
    //   })
    //  })




    setTimeout(() => {
      this.db.collection("Bookings").onSnapshot(data => {
        data.forEach(item => {
          UidArray.push(item.id)

        })
      })

    }, 2000)

    console.log("My keys ", uid);


    setTimeout(() => {

      UidArray.forEach(i => {
        console.log("All My keys ", i);



        this.db.collection("Messages").doc(i).collection("Message").onSnapshot(data => {
          data.forEach(i => {
            console.log("All My messages ", i.data());

          })
        })

      })

      this.db.collection("Messages").doc(uid).collection("Message").doc(key).update({ email: data.mine.email, message: data.mine.message, name: data.mine.name, satatus: "Read" })
      console.log("Message updated");


    }, 3000)


    setTimeout(() => {
      this.MyMessages = []
      this.db.collection("Bookings").get().then( data => {
        data.forEach(item => {
          UidArray.push(item.id)
         
        })
      })
      
     }, 1000)
    
   
  
     this.unReadMessages = 0
     this.AllMessages = 0
     this.ReadMessages = 0
     this.MyMessages = []

     setTimeout(() => {
        
      UidArray.forEach(i => {
        console.log("All My keys ", i);
  
  
        
        this.db.collection("Messages").doc(i).collection("Message").get().then(data => {
 
         
          data.forEach(i => {
           
            console.log("All My messages ", i.data());
            this.AllMessages += 1
            this.MyMessages.push({keys: i.id, mine: i.data()});
            
  
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
        
    this.unReadMessages = 0
    this.AllMessages = 0
    this.ReadMessages = 0
    this.MyMessages = []

    setTimeout(() => {
     this.MyMessages = []
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
           this.MyMessages.push({keys: i.id, mine: i.data()});
           
 
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


  


