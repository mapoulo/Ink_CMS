import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TattooPageModule } from './Pages/tattoo/tattoo.module';
import { Camera } from '@ionic-native/camera/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/auth-guard.service';
import { EditProfilePageModule } from './Pages/edit-profile/edit-profile.module';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { MessagesPageModule } from './messages/messages.module';
import { IonicStorageModule } from '@ionic/storage';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MessagesPageModule, TattooPageModule, EditProfilePageModule,IonicStorageModule.forRoot()],
  providers: [Camera,CallNumber,
    
    StatusBar,
    AuthGuardService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
