import { Component, OnInit, Renderer2, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  itemDiv: any = document.documentElement.getElementsByClassName('item');

  messages = 0;
  fonts = 0
  MessagesId = [];
  messageInfo = {
    name: '',
    email: '',
    message: '',
    time: ''
};
  MyMessages = []
  db = firebase.firestore()
  active: number = 0;
  constructor(private render: Renderer2) {
     

    
   }

  ngOnInit() {
    this.db.collection("Messages").onSnapshot(data => {
      this.messages = 0;
      this.MyMessages = [];
      this.MessagesId = [];
      data.forEach(message => {
        this.fonts++;
        if(message.data().satatus = "NotRead"){
          this.MessagesId.push(message.id)
          this.MyMessages.push({keys: message.id, mine: message.data()});
          this.messages += 1;


        }
      })
    })


  }

  ionViewWillEnter(){


   
   


  }


  updateMessage(key, data, i){

    this.active = i;

    this.messageInfo.name = data.mine.name;
    this.messageInfo.message = data.mine.message;
    this.messageInfo.email = data.mine.email;
    this.messageInfo.time = data.mine.time;

  

   this.db.collection("Messages").get().then(item => {

    item.forEach(data => {
       if(key == data.id){
         this.db.collection("Messages").doc(key).update({email:data.data().email, message: data.data().message, name : data.data().name, satatus: "Read"})
       }
    })
   })

  }

}
