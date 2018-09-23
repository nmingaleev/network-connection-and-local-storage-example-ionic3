import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export enum ConnectionStatus {
    Online,
    Offline
}

@Injectable()
export class NetworkService {
    public status: ConnectionStatus;
    private _status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(null);

    constructor(private _network: Network) {}

    initializeNetworkEvents(): void {
        /* OFFLINE */
        this._network.onDisconnect().subscribe(() => {
            console.log('disconnected');
            this.setStatus(ConnectionStatus.Offline);
        })

        /* ONLINE */
        this._network.onConnect().subscribe(() => {
            console.log('connected');
            this.setStatus(ConnectionStatus.Online);
        })

    }

    get networkType(): string {
        return this._network.type
    }

    get isOnline(): boolean {
        return this._network.type !== 'none';
    }

    getNetworkStatus(): Observable<ConnectionStatus> {
        return this._status.asObservable();
    }
    
    private setStatus(status: ConnectionStatus) {
        this.status = status;
        this._status.next(this.status);
    }
}