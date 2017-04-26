import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Meteor } from 'meteor/meteor';
import { LoginPage } from '../pages/login/login';
import { ChatsPage } from '../pages/chats/chats';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.rootPage = Meteor.user() ? ChatsPage : LoginPage;
    
    platform.ready().then(() => {
      if(platform.is('cordova')){
        statusBar.styleDefault();
        splashScreen.hide();
      }
    });
  }
}
