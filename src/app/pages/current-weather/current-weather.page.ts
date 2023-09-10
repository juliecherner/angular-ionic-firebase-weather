import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { timer, Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { GeolocationService } from 'src/app/services/geolocation/geolocation.service';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ImageStorageService } from 'src/app/services/image-storage/image-storage.service';
import { ActionResult, POPUP_TYPE } from '../../types/popup';
import { Weather } from '../../types/weather';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss'],
})
export class CurrentWeatherPage implements OnInit, OnDestroy {
  toShowPopup: ActionResult = {
    status: false,
    type: POPUP_TYPE.ERROR,
    text: '',
  };
  name: string = '';
  currentWeather: Subscription | null = null;
  toTakePhoto: boolean = false;
  weather: Weather | null = null;
  imageUrl: string = '';
  timerPhotoSubscription: Subscription | null = null;
  maxCameraRetries: number = 3;
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
    private location: Location,
    private imageStorageService: ImageStorageService,
  ) {}

  async ngOnInit() {
    this.name = (await this.authService.getUserLogin()).replace(/@.*$/, '');
  }

  async showCurrentWeather() {
    try {
      const currentPosition =
        await this.geolocationService.getCurrentPosition();

      this.showAndHidePopup(
        POPUP_TYPE.SUCCESS,
        'Please submit the photo',
        3000,
      );

      this.currentWeather = this.weatherService
        .getCurrentByPosition(currentPosition)
        .subscribe({
          next: async (data) => {
            this.weather = this.weatherService.transformResult(data);
            this.takePhoto(3000);

            await this.saveWeather();
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
      await this.photoService
        .take()
        .then(async (data: any) => {
          this.imageUrl = data;
          await this.savePhoto(this.weather?.timestamp || 0, this.imageUrl)
            .then(() => {
              this.saveWeather();
            })
            .catch((error: any) => {
              this.showAndHidePopup(POPUP_TYPE.ERROR, error, 3000);
            });
        })
        .catch((error) => {
          this.handleCameraFailure(error);
        });
    });
  }

  handleCameraFailure(error: string) {
    if (this.maxCameraRetries > 0) {
      const errorText =
        this.maxCameraRetries === 1
          ? 'Maximum retry number is exceeded'
          : error || 'Camera error';
      this.showAndHidePopup(
        POPUP_TYPE.ERROR,
        errorText +
          ` | Submit photo or you loose data, you have ${this.maxCameraRetries} retries`,
        1000,
      );

      if (this.maxCameraRetries !== 1) {
        this.takePhoto(1000);
        this.maxCameraRetries -= 1;
      }
    }
  }

  async savePhoto(timestamp: number, file: any) {
    try {
      this.imageUrl = await this.imageStorageService.save(timestamp, file);
    } catch (error: any) {
      this.showAndHidePopup(POPUP_TYPE.ERROR, error, 3000);
    }
  }

  async saveWeather() {
    try {
      this.dataStorageService.saveCurrentWeatherReport(
        this.weather,
        this.imageUrl,
      );
    } catch (error: any) {
      this.showAndHidePopup(POPUP_TYPE.ERROR, error, 2000);
    }
  }

  async logout() {
    this.localStorageService.deleteLocalUser();
    this.router.navigate(['/login']);
    this.ngOnDestroy();
  }

  backClicked() {
    this.location.back();
  }
  ngOnDestroy() {
    this.currentWeather?.unsubscribe();
    this.timerPhotoSubscription?.unsubscribe();
    this.timePopupSubscription?.unsubscribe();
  }
}
