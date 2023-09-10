import { Injectable } from '@angular/core';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor() {}

  async take() {
    return await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
  }
}
