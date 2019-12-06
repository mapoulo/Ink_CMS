import { MultiFileUploadComponent } from './../../components/multi-file-upload/multi-file-upload.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';



import { RouterModule } from '@angular/router';




import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [

   
    FileUploadModule,

    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage,  MultiFileUploadComponent]
})
export class ProfilePageModule {}
