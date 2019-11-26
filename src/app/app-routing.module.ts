import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)},

  // {
  //   path: '',
  //   loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  // },

  {

    canActivate: [AuthGuardService],
    path: 'landing',
    loadChildren: () => import('./Pages/landing/landing.module').then( m => m.LandingPageModule)
  },

  {
    canActivate: [AuthGuardService],
    path: 'profile',
    loadChildren: () => import('./Pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    canActivate: [AuthGuardService],
    path: 'edit-profile',
    loadChildren: () => import('./Pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    canActivate: [AuthGuardService],
    path: 'notifications',
    loadChildren: () => import('./Pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
