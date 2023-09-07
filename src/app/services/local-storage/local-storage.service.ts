import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    this._storage?.set(key, value);
  }

   public async isUser() {
    return Boolean(await this._storage?.get('weather-app-user'))
  }

  public async getUserName() {
    return (await this._storage?.get('weather-app-user'))
  }

  public deleteLocalUser() {
    this._storage?.remove('weather-app-user');
  }

  async saveUserInfo(email: string) {
    await this.set('weather-app-user', email);
  }

}
