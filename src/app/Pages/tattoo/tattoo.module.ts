import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TattooPageRoutingModule } from './tattoo-routing.module';

import { TattooPage } from './tattoo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TattooPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TattooPage],
  
  
})
export class TattooPageModule {}
