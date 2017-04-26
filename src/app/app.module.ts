import { NgModule, ErrorHandler } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MomentModule } from 'angular2-moment';

import { MyApp } from './app.component';
import { PhoneService } from '../services/phone';
import { PictureService } from '../services/picture';


import { LoginPage } from '../pages/login/login';

import { VerificationPage } from '../pages/verification/verification';

import { ProfilePage } from '../pages/profile/profile';
import { ShowPictureComponent } from '../pages/messages/show-picture';

import { ChatsPage } from '../pages/chats/chats';
import { NewChatComponent } from '../pages/chats/new-chat';
import { ChatsOptionsComponent } from '../pages/chats/chats-options';

import { MessagesOptionsComponent } from '../pages/messages/messages-options';
import { MessagesAttachmentsComponent } from '../pages/messages/messages-attachments';
import { NewLocationMessageComponent } from '../pages/messages/location-message';
import { MessagesPage } from '../pages/messages/messages';



@NgModule({
  declarations: [
    MyApp,
    ChatsPage,
    MessagesPage,
    LoginPage,
    VerificationPage,
    ProfilePage,
    ChatsOptionsComponent,
    NewChatComponent,
    MessagesOptionsComponent,
    MessagesAttachmentsComponent,
    NewLocationMessageComponent,
    ShowPictureComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    MomentModule,
    AgmCoreModule.forRoot({ //google maps için
      apiKey: 'AIzaSyAWoBdZHCNh5R-hB5S5ZZ2oeoYyfdDgniA'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    MessagesPage,
    LoginPage,
    VerificationPage,
    ProfilePage,
    ChatsOptionsComponent,
    NewChatComponent,
    MessagesOptionsComponent,
    MessagesAttachmentsComponent,
    NewLocationMessageComponent,
    ShowPictureComponent

  ],
  providers: [
    StatusBar,
    SplashScreen,
    PictureService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PhoneService
  ]
})
export class AppModule {}
