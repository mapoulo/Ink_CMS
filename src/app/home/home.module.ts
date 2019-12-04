import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';


import { MultiFileUploadComponent } from '../components/multi-file-upload/multi-file-upload.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    IonicModule,
    FileUploadModule,


    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage,  MultiFileUploadComponent]
})
export class HomePageModule {}
