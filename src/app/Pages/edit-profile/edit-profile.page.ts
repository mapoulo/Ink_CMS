import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
