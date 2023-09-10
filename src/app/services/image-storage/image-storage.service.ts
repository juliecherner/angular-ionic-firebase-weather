import { Injectable } from '@angular/core';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageStorageService {
  private basePath = '/uploads';

  constructor() {}

  async save(timestamp: number, uri: any) {
    const response = await fetch(uri.webPath);
    const blobData = await response.blob();

    try {
      const path = `${this.basePath}/${timestamp.toString()}.png`;
      const app = initializeApp(environment.firebase, 'Storage');

      const storage = getStorage(
        app,
        `gs://${environment.firebase.storageBucket}`,
      );
      const storageRef = ref(storage, path);
      await uploadBytesResumable(storageRef, blobData);
      return await getDownloadURL(storageRef);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
