import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Browser } from '@capacitor/browser';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { WeatherReport } from '../../types/weather';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss'],
})
export class HistoryPage implements OnDestroy {
  toShowHistory: boolean = false;
  historyReports: WeatherReport[] = [];
  historySusbcription: Subscription | null = null;
  isLoading: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private location: Location,
  ) {}

  async showHistory() {
    this.toShowHistory = true;
    await this.findHistory();
  }
  async findHistory() {
    this.isLoading = true;
    this.dataStorageService.getWeatherHistoryByUser().then((data) => {
      data.subscribe({
        next: (data: any) => {
          this.historyReports = data;
          this.toShowHistory = true;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    });
  }

  backClicked() {
    this.location.back();
  }

  async seeFullPhoto(imageUrl: string) {
    await Browser.open({ url: imageUrl });
  }

  ngOnDestroy() {
    this.historySusbcription?.unsubscribe();
  }
}
