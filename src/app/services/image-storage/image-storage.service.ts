import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageStorageService {

private basePath = '/uploads';


constructor(private storage: AngularFireStorage) { }

getImageUrl(){
  const storageRef = this.storage.ref(this.basePath);  
}

}
