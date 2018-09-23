import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {
    constructor(private _storage: Storage) {}

    ready(): Promise<LocalForage> {
        return this._storage.ready();
    }

    set(key: string, value) {
        return this._storage.set(key, value);
    }

    clear() {
        return this._storage.clear();
    }

    forEach(callback): Promise<void> {
        return this._storage.forEach(callback);
    }
}