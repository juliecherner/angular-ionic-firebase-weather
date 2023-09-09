import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer, Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { GeolocationService } from 'src/app/services/geolocation/geolocation.service';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
//import { ImageStorageService } from 'src/app/services/image-storage/image-storage.service';
import { ActionResult, POPUP_TYPE } from '../../types/popup';
import { Weather } from '../../types/weather';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  toShowPopup: ActionResult = {
    status: false,
    type: POPUP_TYPE.ERROR,
    text: '',
  };
  name: string = '';
  currentWeather: Subscription | null = null;
  toTakePhoto: boolean = false;
  weather: Weather | null = null;
  timerPhotoSubscription: Subscription | null = null;
  maxCameraRetries: number = 5;
  timePopupSubscription: Subscription | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private geolocationService: GeolocationService,
    private photoService: PhotoService,
    private weatherService: WeatherService,
    private router: Router,
    private popupService: PopupService,
    private dataStorageService: DataStorageService,
    private authService: AuthService,
  ) {}

  async ngOnInit() {
    this.name = (await this.authService.getUserLogin()).replace(/@.*$/, '');
  }

  async showCurrentWeather() {
    try {
      const currentPosition =
        await this.geolocationService.getCurrentPosition();

      this.currentWeather = this.weatherService
        .getCurrentByPosition(currentPosition)
        .subscribe({
          next: (data) => {
            this.weather = this.weatherService.transformResult(data);

            this.saveWeather();
            // save results to weather db

            this.showAndHidePopup(
              POPUP_TYPE.SUCCESS,
              'Please submit a photo of the sky',
              5000,
            );
            this.takePhoto(5000);
          },
          error: (error: any) => {
            this.showAndHidePopup(POPUP_TYPE.ERROR, error, 5000);
          },
        });
    } catch {
      this.showAndHidePopup(
        POPUP_TYPE.ERROR,
        'Geolocation is not defined',
        3000,
      );
    }
  }

  showAndHidePopup(type: POPUP_TYPE, text: string, delay: number) {
    this.toShowPopup = this.popupService.show(type, text);

    this.timePopupSubscription = timer(delay).subscribe(async () => {
      this.toShowPopup = this.popupService.hide();
    });
  }

  async takePhoto(delay: number) {
    this.timerPhotoSubscription = timer(delay).subscribe(async () => {
      this.photoService
        .take()
        .then((data) => {
          //save result to photo db
          console.log('data', data);
        })
        .catch((error) => {
          this.handleCameraFailure(error);
        });
    });
  }

  handleCameraFailure(error: string) {
    if (this.maxCameraRetries > 0) {
      this.showAndHidePopup(POPUP_TYPE.ERROR, error || 'Camera error', 1000);

      this.takePhoto(1000);

      this.maxCameraRetries -= 1;
    }

    if (this.maxCameraRetries === 0) {
      this.showAndHidePopup(
        POPUP_TYPE.ERROR,
        'Maximum retry number is exceeded',
        1000,
      );
      return;
    }
  }

  // async savePhoto() {
  //   //this.theimageStorageService.save();
  //   //await this.imageStorageService.save();
  // }

  saveWeather() {
    try {
      this.dataStorageService.saveCurrentWeatherReport(this.weather);
    } catch (error: any) {
      this.showAndHidePopup(POPUP_TYPE.ERROR, error, 2000);
    }
  }

  async logout() {
    this.localStorageService.deleteLocalUser();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.currentWeather?.unsubscribe();
    this.timerPhotoSubscription?.unsubscribe();
    this.timePopupSubscription?.unsubscribe();
  }
}
