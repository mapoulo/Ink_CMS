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


  category: string = "AllMessages"
  UnreadMessages = []
  AllReadMessages = []
  AllMyMessages = []

  messageInfo = {
    name: '',
    email: '',
    message: '',
    time: ''
  };
  
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


    let MyMessages = 0
    let ReadMessages = 0
    let AllMessages = 0
    let UidArray = []
    

    setTimeout(() => {
     this.db.collection("Bookings").onSnapshot(data => {
      MyMessages = 0
      ReadMessages = 0
      AllMessages = 0
      data.forEach(item => {
        UidArray.push(item.id)
       
      })
     })
    }, 3000)
   
  
  
   
    setTimeout(() => {
       
     
     UidArray.forEach(i => {
 
       this.db.collection("Messages").doc(i).collection("Message").onSnapshot(data => {
      
        MyMessages = 0
        this.unReadMessages  = 0;
        ReadMessages = 0
        this.ReadMessages = 0
        AllMessages = 0
        this.AllMessages = 0


         data.forEach(i => {
           

          AllMessages += 1
          this.AllMessages = AllMessages 

          
          if(i.data().satatus == "NotRead"){
            MyMessages += 1
            this.unReadMessages  = MyMessages

          }
          
          if(i.data().satatus == "Read"){
            ReadMessages += 1
            this.ReadMessages  = ReadMessages
           
          }

          
           
           
         })
        
       })
       
       
     })



     UidArray.forEach(i => {
 
      this.db.collection("Messages").doc(i).collection("Message").onSnapshot(data => {
     
     
       let obj = {obj :{}, id : ""}
       this.AllMyMessages = []
        data.forEach(i => {

        obj.obj = i.data();
        obj.id = i.id
        
        this.AllMyMessages.push(obj) 
        obj = {obj :{}, id : ""}
        console.log("AllMyMessages ", this.AllMyMessages);
        
          
        })
       
      })
      
      
    })


    UidArray.forEach(i => {
 
      this.db.collection("Messages").doc(i).collection("Message").onSnapshot(data => {
     
     
       let obj = {obj :{}, id : ""}

       this.AllReadMessages = []

        data.forEach(i => {

          if(i.data().satatus == "Read"){


            obj.obj = i.data();
            obj.id = i.id

            this.AllReadMessages.push(obj) 
            obj = {obj :{}, id : ""}
            console.log("AllReadMessages ", this.AllReadMessages);
           
          }

        })
       
      })
      
      
    })


    UidArray.forEach(i => {
 
      this.db.collection("Messages").doc(i).collection("Message").onSnapshot(data => {
     
     
       let obj = {obj :{}, id : ""}

       this.UnreadMessages = []

        data.forEach(i => {

          if(i.data().satatus == "NotRead"){


            obj.obj = i.data();
            obj.id = i.id

            this.UnreadMessages.push(obj) 
            obj = {obj :{}, id : ""}
            console.log("UnreadMessages ", this.UnreadMessages);
           
          }

        })
       
      })
      
      
    })
  
  
  
   
     
    }, 1000)


 

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
   
    


      
      //   let UidArray = []
        
    
      //  setTimeout(() => {
      //   this.MyMessages = []
      //   this.db.collection("Bookings").onSnapshot(data => {

      //     data.forEach(item => {
      //       UidArray.push(item.id)
           
      //     })

      //   })
        
      //  }, 1000)
      
     
    
    
      //  setTimeout(() => {
          
      //   UidArray.forEach(i => {
      //     console.log("All My keys ", i);
    
    
          
      //     this.db.collection("Messages").doc(i).collection("Message").onSnapshot(data => {

      //       data.forEach(i => {
             
            
      //         this.AllMessages += 1
      //         this.MyMessages.push({keys: i.id, mine: i.data()});
      //         console.log("All My messages ",   this.AllMessages);
              
    
      //        if(i.data().satatus == "NotRead"){
      //          this.unReadMessages += 1
      //        }
    
      //        if(i.data().satatus == "Read"){
      //          this.ReadMessages += 1
      //        }
      //       })

      //     })
          
      //   })
    
     
      
        
      //  }, 1000) 

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

  ionViewWillEnter() {

 

  }



  updateMessage(uid, key, data, i) {


    
   
  
    console.log("Your data is here ", key);
    let UidArray = []

    this.uid = uid
    this.key = key

    this.active = i;

    this.messageInfo.name = data.name;
    this.messageInfo.message = data.message;
    this.messageInfo.email = data.email;
    this.messageInfo.time = data.time;

    this.render.setStyle(this.contentMessages[0], 'display', 'flex');

    this.db.collection("Messages").doc(uid).collection("Message").doc(key).update({ email: data.email, message: data.message, name: data.name, satatus: "Read" })
    console.log("Message updated");




    // setTimeout(() => {
      
    //   this.db.collection("Bookings").onSnapshot(data => {
    //     data.forEach(item => {
    //       UidArray.push(item.id)

    //     })
    //   })

    // }, 2000)

    console.log("My keys ", uid);


    // setTimeout(() => {

    //   UidArray.forEach(i => {
    //     console.log("All My keys ", i);



    //     this.db.collection("Messages").doc(i).collection("Message").onSnapshot(data => {
    //       data.forEach(i => {
    //         console.log("All My messages ", i.data());

    //       })
    //     })

    //   })

    //   this.db.collection("Messages").doc(uid).collection("Message").doc(key).update({ email: data.mine.email, message: data.mine.message, name: data.mine.name, satatus: "Read" })
    //   console.log("Message updated");


    // }, 3000)


    // setTimeout(() => {
    
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
    

    // let UidArray = []
        
    // this.unReadMessages = 0
    // this.AllMessages = 0
    // this.ReadMessages = 0
   

    // setTimeout(() => {
   
    //  this.db.collection("Bookings").get().then( data => {
    //    data.forEach(item => {
    //      UidArray.push(item.id)
        
    //    })
    //  })
     
    // }, 1000)
   
  
 
 
    // setTimeout(() => {
       
    //  UidArray.forEach(i => {
    //    console.log("All My keys ", i);
 
 
       
    //    this.db.collection("Messages").doc(i).collection("Message").get().then(data => {

    //     this.AllMessages = 0
    //      data.forEach(i => {
          
    //        console.log("All My messages ", i.data());
    //        this.AllMessages += 1
       
           
 
    //       if(i.data().satatus == "NotRead"){
    //         // this.unReadMessages += 1
    //       }
 
    //       if(i.data().satatus == "Read"){
    //         this.ReadMessages += 1
    //       }
    //      })

    //    })
       
    //  })
 
  
   
     
    // }, 2000) 
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


  


