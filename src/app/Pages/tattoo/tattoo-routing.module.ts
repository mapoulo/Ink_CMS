import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TattooPage } from './tattoo.page';

const routes: Routes = [
  {
    path: '',
    component: TattooPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TattooPageRoutingModule {}
