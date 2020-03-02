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
   content: any = document.documentElement.getElementsByClassName('documentElement');
  itemDiv: any = document.documentElement.getElementsByClassName('item');
  contentMessages: any = document.getElementsByClassName('content-messages');

  key = ''
  uid = ''
  response = ""
  messages = 0;
  image = ""
  number = ""
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

  DisplayMessages = []

  Names = []
  NamesSorted = []
  name : ""
  cmsImage : ""

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

  scrollToBottomOnInit() {
    this.content.scrollTop = this.content.scrollHeight;
    
  }
check(){

let str1 = new String( "This" );
  
let index = str1.localeCompare( "This "); 
console.log("localeCompare first :" + index );

  }

  ngOnInit() {

    

    this.db.collection("Message").orderBy('time', 'desc').onSnapshot(data => {

      this.Names = []
      this.NamesSorted = []
     
      let index = 0
      let obj = {name : "", uid : "", image : ""}
  
       data.forEach(item => {
  
         if(item.data().name != "" && item.data().name != undefined && item.data().name != null){
      
          obj.name = item.data().name
          obj.image = item.data().image;
          obj.uid = item.data().uid               
          this.Names.push(obj)
          obj = {name : "", uid : "", image : ""}  


 
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
   
      this.scrollToBottomOnInit();
  
  }


  async Respond(){
    let shouldScroll = this.content.scrollTop + this.content.clientHeight === this.content.scrollHeight;
    console.log('scroll nOW', shouldScroll);
    
    this.db.collection("Message").doc().set({
      message : this.response,
       uid : this.uid,  time : moment().format('MMMM Do YYYY, h:mm:ss a'),
    cmsUid : null ,
    status: "NotRead"
  })

     this.response = "";

//  this.updateMessage(this.uid)

    if(!shouldScroll) {
      console.log('scrolling');
      
      this.scrollToBottomOnInit();
    }

  }



  updateMessage(uid) {

    this.uid = uid;
    this.DisplayMessages = []

    this.db.collection("Message").orderBy('time', 'asc').get().then(
      data => {

        this.DisplayMessages = []

        data.forEach(item => {

          this.db.collection("Message").doc(item.id).set({
            status : "Read"
          }, {merge : true})

          if(item.data().uid == uid){
            this.DisplayMessages.push(item.data())
          }
        })
      }
    )
    console.log('Your data is here ', this.DisplayMessages);


    this.db.collection("Users").doc(uid).onSnapshot(data => {
      this.image = data.data().image;
      this.number = data.data().number;
      this.name = data.data().name;
      console.log("Image ", this.image);
      console.log("Number ",  this.number);
      
      
    })


    this.db.collection("Admin").onSnapshot(data => {
      data.forEach(item => {
        this.cmsImage = item.data().image
      })
    })


    this.db.collection("Message").get().then(item => {
      item.forEach(data => {
        // if(data.data().uid == uid && data.data().cmsUid != null){
        //   this.db.collection("Message").doc(data.id).set({status : "Read"}, {merge : true})
        // }
      })
    })


  }


  
  sear(ev){
    console.log(ev.target.value);
    let query = ev.target.value
    if(query === ''){
      this.data = this.NamesSorted
    }else{
      this.searchResult(query)
    }
  //   for(let i = 0; i < this.NamesSorted.length; i++){
      
  //     if(this.NamesSorted[i].name === ev.detail.data) {
  //       //  if( num % 1 != 0){
  //       //     alert("Enter a whole number!")
  //       //     --i;  // reset the counter for amount of numbers entered
  //       //  }else{
  //       //     numbers.push(num);
  //       //  }
  //     } // console.log(ev.detail.data);
  // }
}



data : Array<any>


searchResult(event){
  
  let array : Array<any> =[]
  let search = event.toLowerCase()
  this.data = this.NamesSorted.filter(item => item.name.toLowerCase().indexOf(search))
  console.log(this.data);
  
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
