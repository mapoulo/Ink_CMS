import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationsService } from 'src/app/notifications.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  username: string=""
  password: string=""
db=firebase.firestore();
  loader = true;


  name = ""
  address = ""
  email = ""
  pdf = ""
  phoneNumber = ""
  tokeId = ""

  get Username() {
    return this.loginForm.get('usernameL');
  }
  get Password() {
    return this.loginForm.get('passowrd');
  }


  constructor(private router: Router, private notifications : NotificationsService ,private fb: FormBuilder, public toastCtrl: ToastController,private auth: AuthenticationService) { }

  ngOnInit() {

    setTimeout(() => {
        this.loader = false;
    }, 2000);

    this.loginForm = this.fb.group({
      usernameL: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(6)])),
    })
  }

 



  Login(){
    this.loader = true;
    const {username,password}=this
    firebase.auth().signInWithEmailAndPassword(username, password).then((result) => {
      

      this.db.collection('Admin').doc(firebase.auth().currentUser.uid).get().then(res =>{

        if (res.exists){

       
          this.tokeId = this.notifications.token;

          this.db.collection("Admin").doc(firebase.auth().currentUser.uid).onSnapshot(data => {

           this.name = data.data().name
            this.address = data.data().address
           this.email = data.data().email
           this.pdf = data.data().pdf
           this.phoneNumber = data.data().phoneNumber

          })
          
          setTimeout(() => {
            this.db.collection("Admin").doc(firebase.auth().currentUser.uid).update({
              name :this.name,
              address :this.address,
              email :this.email,
              pdf :this.pdf,
              phoneNumber :this.phoneNumber,
              tokenId : this.tokeId
        })
          }, 4000);

       
          console.log("Logged in succesful")
          this.router.navigateByUrl('/landing');
          setTimeout(() => {
            this.loader = false;
          }, 4000);
         
        }else{
         

            

           this.loader = true;
           this.auth.logoutUser().then(()=>{
            this.router.navigateByUrl('login');
             setTimeout(() => {
              this.loader = false;
            }, 4000);
          })


        }
            })




      
  }).catch((error) => {
    setTimeout(() => {
      this.loader = false;
    }, 4000);

    this.presentToast();
  
  });

  this.name = ""
  this.address = ""
  this.email = ""
  this.pdf = ""
  this.phoneNumber = ""
  this.tokeId = ""

  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Oooweee! Admin not found!!',
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }

}
