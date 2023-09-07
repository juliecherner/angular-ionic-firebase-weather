import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { GeolocationService } from 'src/app/services/geolocation/geolocation.service';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { ActionResult, POPUP_TYPE } from '../../types/popup';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  toShowPopup: ActionResult = {
    status: false,
    type: POPUP_TYPE.ERROR,
    text: '',
  };
  name: string = '';
  currentWeather: any = null;
  toTakePhoto: boolean = false;
  a: any = '';

  constructor(
    private localStorageService: LocalStorageService,
    private geolocationService: GeolocationService,
    private photoService: PhotoService,
  ) {}

  async ngOnInit() {
    this.name = (await this.localStorageService.getUserName()).replace(
      /@.*$/,
      '',
    );
  }

  async showCurrentWeather() {
    const currentPosition = await this.geolocationService.getCurrentPosition();

    //   const currentPosition = {
    //     latitude: 67,
    //     longitude: 1
    // }

    this.currentWeather = this.geolocationService
      .getWeatherByCurrentPosition(currentPosition)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.showAndHidePopup(
            POPUP_TYPE.SUCCESS,
            'Please submit a photo of the sky',
          );

          setTimeout(async () => {
            await this.takePhoto();
          }, 7000);
        },
        error: (err: any) => {
          this.showAndHidePopup(POPUP_TYPE.ERROR, err?.message);
        },
      });

    this.showAndHidePopup(POPUP_TYPE.ERROR, 'blablbla');
  }

  showAndHidePopup(type: POPUP_TYPE, text: string) {
    this.toShowPopup = {
      status: true,
      type: type,
      text: text || 'Something went wrong',
    };

    setTimeout(() => {
      this.toShowPopup = {
        status: false,
        type,
        text: '' || 'Succeeded!',
      };
    }, 7000);
  }

  async takePhoto() {
    const photo = await this.photoService
      .takePicture()
      .then((data) => {
        this.a = data?.base64String;
        console.log('data', data);
      })
      .catch(() => {});
  }

  ngOnDestroy() {
    this.currentWeather.unsubscribe();
  }
}
