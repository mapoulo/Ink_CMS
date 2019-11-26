import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TattooPageRoutingModule } from './tattoo-routing.module';

import { TattooPage } from './tattoo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TattooPageRoutingModule
  ],
  declarations: [TattooPage]
})
export class TattooPageModule {}
