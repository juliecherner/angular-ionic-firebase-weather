import { Component, OnDestroy } from '@angular/core';
import {Location} from '@angular/common';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Weather } from '../../types/weather';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss'],
})
export class HistoryPage implements OnDestroy {
  toShowHistory: boolean = false;
  historyReports: Weather[] = [];
  historySusbcription: Subscription | null = null;
  isLoading: boolean = false;
  filePath: string =
    'https://www.vecteezy.com/photo/24298640-panoramic-picture-from-gardens-by-the-bay-in-singapore-during-daytime';
  constructor(private dataStorageService: DataStorageService, private location: Location) {}

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
  
  ngOnDestroy() {
    this.historySusbcription?.unsubscribe();
  }
}
