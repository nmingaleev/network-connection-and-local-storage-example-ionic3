import { StorageService } from './../services/storage.service';
import { NetworkService } from './../services/network.service';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private _networkSrv: NetworkService,
    private _storageService: StorageService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this._networkSrv.initializeNetworkEvents();

      // Subscribing to connection changes
      this._networkSrv.getNetworkStatus().subscribe(() => {
        // if we are online
        if (this._networkSrv.isOnline) {
          // Iterate through data which is stored in local db
          this._storageService.forEach((value, key) => {
            // Handle saved data hear
            console.log(value, key);
          }).then(() => {
            // Cleat stoarge after the data is handled
            this._storageService.clear().then(() => {
              console.log('cleared');
            });
          });
        }
      });
    });
  }
}
