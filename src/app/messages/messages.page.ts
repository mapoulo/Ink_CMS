import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {



  messages = 0
  MessagesId = [];

  MyMessages = []
  db = firebase.firestore()
  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter(){


    this.db.collection("Messages").onSnapshot(data => {
      this.messages = 0;
      this.MyMessages = [];
      this.MessagesId = [];
      data.forEach(message => {
        if(message.data().satatus = "NotRead"){
          this.MessagesId.push(message.id)
          this.MyMessages.push({keys: message.id, mine: message.data()});
          this.messages += 1;
        }
      })
    })


   


  }

  updateMessage(key){

   this.db.collection("Messages").get().then(item => {

    item.forEach(data => {
       if(key == data.id){
         this.db.collection("Messages").doc(key).update({email:data.data().email, message: data.data().message, name : data.data().name, satatus: "Read"})
       }
    })
   })

  }

}
