import { NetworkService } from './../../services/network.service';
import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(
    public navCtrl: NavController,
    private _storageSrv: StorageService,
    private _networkSrv: NetworkService
  ) {

  }

  ngOnInit() {
    this._storageSrv.ready().then(result => {
      console.log(result);
    });

    this._networkSrv.getNetworkStatus().subscribe(status => {
      console.log(this._networkSrv.isOnline);
    })

    console.log(this._networkSrv.isOnline);
  }

  send() {
    const data = {
      data: 'test',
      httpAddress: 'http:test.com',
      method: 'post'
    };

    if (this._networkSrv.isOnline) {
      // Send http request
      return;
    }

    this._storageSrv.set('test', data).then(() => {
      console.log('In sate');
    });
  }

}
