import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},

  {
    path: '',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'landing',
    loadChildren: () => import('./Pages/landing/landing.module').then( m => m.LandingPageModule)
  },

  {
    path: 'profile',
    loadChildren: () => import('./Pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./Pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./Pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'tattoo',
    loadChildren: () => import('./pages/tattoo/tattoo.module').then( m => m.TattooPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
