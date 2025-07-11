import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null = null;

  constructor() {}

  async init() {
    if (!this._storage) {
      const storage = new Storage();
      this._storage = await storage.create();
    }
  }

  async set(key: string, value: any) {
    if (!this._storage) {
      await this.init();
    }
    return this._storage?.set(key, value);
  }

  async get(key: string) {
    if (!this._storage) {
      await this.init();
    }
    return this._storage?.get(key);
  }

  async remove(key: string) {
    if (!this._storage) {
      await this.init();
    }
    return this._storage?.remove(key);
  }
}