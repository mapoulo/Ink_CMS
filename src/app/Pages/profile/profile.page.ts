import { DataService } from './../../data.service';

import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Platform, AlertController } from '@ionic/angular';
import { EditProfilePage } from '../edit-profile/edit-profile.page';
import { ModalController} from '@ionic/angular';
import { merge } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 loader = true;
 pdf;

 pdfObj = null;
 tattoo = {
  name: '',
  pricerange: '',
  description: '',
  image: '',
  categories:''
  
}

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

  toastCtrl: any;
  notifications : number = 0;
 
  storage = firebase.storage().ref();


  constructor(private alertCtrl:AlertController, public data : DataService,public rout : Router,private auth: AuthenticationService,private plt: Platform,public modalController: ModalController) { }



  
  ngOnInit() {

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

  goToNotificationsPage(){

    this.rout.navigateByUrl('/notifications')

}



image(event){
 

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
      this.image1 = dwnURL;
    });
  });


  
}
editData(){
  console.log("aaaaaaaaaa", this.data.MyData);
  firebase.firestore().collection("Admin").doc(this.data.MyData.id).update( {
    name : this.name,
    phoneNumber : this.phoneNumber,
    email : this.email
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

      this.email=firebase.auth().currentUser.email;

      this.db.collection("Admin").onSnapshot(data => {
        this.Admin = [];
        data.forEach(item => {
          if(item.exists){
            if(item.data().email === this.email){
              
             this.profile.name = item.data().name;
             this.profile.address = item.data().address;
             this.profile.phone = item.data().phoneNumber;
             this.profile.email = item.data().email;
             this.profile.pdf = item.data().pdf;
             
              
            }
          }
        })
      })
    

  
    }
  



    changeListener(event): void {
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
    }


  //   download() {

  //     this.fileOpener.open(this.pdf, 'application/pdf')
  // .then(() => console.log('File is opened'))
  // .catch(e => console.log('Error opening file', e));

  //     // const fileTransfer: FileTransferObject = this.transfer.create();
  //     // fileTransfer.download(this.pdf, this.file.dataDirectory + 'file.pdf').then((entry) => {
  //     //   console.log('download complete: ' + entry.toURL());
  //     // }, (error) => {
  //     //   // handle error
  //     // });
      
  //   }
    

  async  createModal(){
       
    }



    
   

    async presentModal() {
      const modal = await this.modalController.create({
        component: EditProfilePage
      });
      return await modal.present();
      
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
              
              this.db.collection("Admin").doc(firebase.auth().currentUser.uid).get().then(data => {
                console.log("dataaaa ", data.data());

                this.profile1.address = data.data().address;
                this.profile1.name = data.data().name;
                this.profile1.email = data.data().email;
                this.profile1.phoneNumber = data.data().phoneNumber;

                
                console.log("rrrrrrrrrrrrrr ",  this.profile1);
                this.db.collection("Admin").doc(firebase.auth().currentUser.uid).set(this.profile1);

              })

             
            
            }
          }
        ]
      });
  
    
      await alert.present();
 
    }

    



/*   // 
      changeListener(event): void {
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
      } */
}