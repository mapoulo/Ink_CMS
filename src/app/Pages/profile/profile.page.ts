import { MessagesPage } from 'src/app/messages/messages.page';
import { DataService } from './../../data.service';
import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Platform, AlertController } from '@ionic/angular';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { ModalController} from '@ionic/angular';
// import { FileOpener } from '@ionic-native/file-opener/ngx';
import { MessagesPageModule } from 'src/app/messages/messages.module';
import { MessagesPage } from 'src/app/messages/messages.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 loader = true;
 messages = 0
 MyMessages = [];
 UnreadMessages = [];
 pdf;
 pdfObj = null;
 tattoo = {
  name: '',
  pricerange: '',
  description: '',
  image: '',
  categories:''
  
}

notifications = 0;
  messages = 0

fullscreen:boolean = false;
fullScreenImage: string = '';
category: string = 'users'
Pending=[]
AllUsers=[]
AllUsersLength: number=0;
image1  = ""
name=""
email=""
phoneNumber=""
 db = firebase.firestore();
 Admin = [];
  profile={
    name: '',
    address: '',
    phone: '',
    email: '',
    pdf: ''
}
profile1 ={
  name: '',
  address: '',
  phoneNumber: '',
  email: '',
  
  
}

Users = []

  toastCtrl: any;
 
  pendingLength: number=0;
 
  storage = firebase.storage().ref();
  constructor(public AlertController:AlertController,public data : DataService, public rout : Router,private auth: AuthenticationService,private plt: Platform,public modalController: ModalController, public alertCtrl: AlertController) { }
  
  ngOnInit() {

    this.db.collection("Bookings").onSnapshot(data => {
      this.notifications = 0
      data.forEach(item => {
        if(item.data().bookingState == "waiting"){
          this.notifications += 1
        }
      })
    })


    this.db.collection("Message").onSnapshot(data => {
    
      this.messages  = 0
      data.forEach(item => {
       
        if(item.data().status == "NotRead"){
          this.messages += 1
        
         
        }
        
      })
    })


    this.db.collection("Response").onSnapshot(data => {
      this.Pending = []
      data.forEach(item => {
        if(item.data().bookingState == "Pending"){
          this.Pending.push(item.data())
        }
           
      })
    })


    this.db.collection("Users").onSnapshot(data => {
    
      this.Users = []
      data.forEach(item => {
         
            this.Users.push(item.data())
      })
    })


    this.db.collection("Admin").onSnapshot(data => {
      data.forEach(item => {
        this.image1 = item.data().image;
      })
    })
 
    this.notifications = this.data.notification
    setTimeout(() => {
      this.loader = false;
    }, 2000);
    console.log("This is your pdf",this.pdf);
    
  }

  async  viewMessages(){

    const modal = await this.modalController.create({
      component: MessagesPage,
      cssClass:'modalMessages'

    });
    return await  modal.present();

  }



  goToNotificationsPage(){
    this.rout.navigateByUrl('/notifications')
}
animateClose(image) {
  this.fullScreenImage = image;
  this.fullscreen = !this.fullscreen;
}
goProfilePage () {
  this.rout.navigateByUrl('/profile');
}
image(event){
 
  const i = event.target.files[0];
  console.log(i);
  const upload = this.storage.child(i.name).put(i);
  upload.on('state_changed', snapshot => {
    this.loader=true;
     
    setTimeout(() => {
      this.loader = false;
   }, 1000);
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('upload is: ', progress , '% done.');
  }, err => {
  }, () => {
    upload.snapshot.ref.getDownloadURL().then(dwnURL => {
      console.log('File avail at: ', dwnURL);
      this.image1 = dwnURL;
    });
  });
  
}

editData(){

  console.log("aaaaaaaaaa", this.data.MyData);
  firebase.firestore().collection("Admin").doc(this.data.MyData.id).update( {
    name : this.name,
    phoneNumber : this.phoneNumber,
    email : this.email,
  
  });

}


  logout(){

    this.loader = true;
    this.auth.logoutUser().then(()=>{
      this.rout.navigateByUrl('login');
      setTimeout(() => {
        this.loader = false;
      }, 4000);
    })

}


    ionViewWillEnter(){

      this.db.collection("Bookings").onSnapshot(data => {
        this.notifications = 0
        data.forEach(item => {
          if(item.data().bookingState == "waiting"){
            this.notifications += 1
          }
        })
      })
      
      this.db.collection("Message").onSnapshot(data => {
        this.UnreadMessages = []
        this.messages  = 0
        data.forEach(item => {
         
          if(item.data().status == "NotRead"){
            this.messages += 1
            this.UnreadMessages.push(item.data())
           
          }
          
        })
      })
      


      firebase.auth().onAuthStateChanged(user => {
        if(user){
          this.db.collection("Admin").doc(firebase.auth().currentUser.uid).onSnapshot(data => {
            console.log("Your Admin user ", data.data());
            this.profile.name = data.data().name;
            this.profile.address = data.data().address;
            this.profile.phone = data.data().phoneNumber;
            this.profile.email = data.data().email;
            this.profile.pdf = data.data().pdf;
             
          })
        }
      })
   
          
    this.db.collection("Bookings").onSnapshot(data => {
      data.forEach(item => {
        this.AllUsers.push(item.data());
      
     
        console.log( "AllUsers", this.AllUsers );
        this.AllUsersLength=this.AllUsers.length;
      })
    })
      

     
  
    
    }
  
  async  createModal(){
       
    }
    
   
    async presentModal() {
      const modal = await this.modalController.create({
        component: EditProfilePage
      });
      return await modal.present();
      
    }
  
    changeListener(event): void {
      this.loader=true;
      const i = event.target.files[0];
      console.log(i);
      const upload = this.storage.child(i.name).put(i);
      upload.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('upload is: ', progress , '% done.');
          
         
        
      }, err => {
      }, () => {
        upload.snapshot.ref.getDownloadURL().then(dwnURL => {
          console.log('File avail at: ', dwnURL);
          this.pdf = dwnURL;
        this.db.collection('Admin').doc(firebase.auth().currentUser.uid).set({pdf: this.pdf}, {merge: true});
        });
      });
      setTimeout(() => {
        this.loader = false;
       this.reg1();  
      }, 3000);
     
    }


    async  viewMessages(){

      const modal = await this.modalController.create({
        component: MessagesPage,
        cssClass:'modalMessages'
  
      });
      return await  modal.present();
  
    }
    
    async reg1(){
      const alert = await this.AlertController.create({
        header: "",
        subHeader: "",
        message: "Contract Form Uploaded successfully",
        buttons: ['OK']
      });
      alert.present();
  }  
  async del(){
    const alert = await this.AlertController.create({
      header: "",
      subHeader: "",
      message: "Contract Form deleted successfully",
      buttons: ['OK']
    });
    alert.present()
   
}
  
    async DeleteData() {

    
      

      const alert = await this.alertCtrl.create({
        header: 'Delete',
        message: 'Are you sure you want to delete the Contract?',
        buttons: [
          {
            text: 'Cancel',
            
            handler: data => {
              console.log('Cancel clicked');
            }
          }, {
            text: 'Delete',
            handler: data => {

              this.db.collection("Admin").doc(firebase.auth().currentUser.uid).set({pdf : ""}, {merge : true})
              
             this.del();
             
            
            }
          }
        ]
      });
  
    
      await alert.present();
 
    }
    
}