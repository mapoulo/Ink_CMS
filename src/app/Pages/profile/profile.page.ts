import { MultiFileUploadComponent } from './../../components/multi-file-upload/multi-file-upload.component';

import { DataService } from './../../data.service';
import { Component, OnInit,  ViewChild} from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';






import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  @ViewChild(MultiFileUploadComponent, { static: false }) fileField: MultiFileUploadComponent;

  name: string;
  phoneNumber: string;
  email: string;


  db = firebase.firestore();
  PersonsDetails = {};

  constructor(public router : Router, private auth: AuthenticationService,  public data : DataService) {}
 loader = true;
 pdf;
 

  ngOnInit() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);

    console.log(this.pdf);
    
  }
  goToNotificationsPage(){
    this.router.navigateByUrl('/notifications')
}

  logout(){
    this.loader = true;
    this.auth.logoutUser().then(()=>{
      this.router.navigateByUrl('login');
      setTimeout(() => {
        this.loader = false;
      }, 4000);
    })
    }

  ionViewWillEnter(){

    let obj = {id: '', obj : {}};

       this.db.collection("Admin").get().then(res => {
         this.PersonsDetails = [];
         res.forEach(doc => {
           if(doc.exists){
             obj.id = doc.id;
             obj.obj = doc.data();
           
              this.PersonsDetails = obj;

              this.data.MyData.id = doc.id;
              this.data.MyData.name = doc.data().name;
              this.data.MyData.phoneNumber = doc.data().phoneNumber;
              this.data.MyData.email = doc.data().email;


              this.name = doc.data().name;
              this.phoneNumber =  doc.data().name;
              this.email =  doc.data().name;

              console.log("uuuuuuuuuuuuuu", this.PersonsDetails);
              obj = {id: '', obj : {}};
           }
         })
       })  
  }


  upload(){

    let files = this.fileField.getFiles();

    let blob = new Blob([JSON.stringify(files[0])], {type : 'application/pdf'});

    let   fileOfBlob = new File([blob], 'application/pdf');

    let formData = new FormData();

    formData.append('somekey', 'some value') // Add any other data you want to send

    files.forEach((file) => {
      
      formData.append('files[]', fileOfBlob);
      console.log("7777", file);

      let storage = firebase.storage();
      storage.ref("data/").put(blob).then(res => {
        console.log("Data submitted");
        
      }).catch(error => {
        console.log("Error",JSON.stringify(error));
        
      })

    });

    // POST formData to Server

  }


  goToEditPage(){
    this.router.navigateByUrl("/edit-profile");
  }

}
