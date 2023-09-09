import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { Weather } from '../../types/weather';
import { error } from 'console';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnDestroy {
  toShowHistory: boolean = false;
  historyReports: Weather[] = [];
  historySusbcription: Subscription | null = null;
  filePath: string = "https://www.vecteezy.com/photo/24298640-panoramic-picture-from-gardens-by-the-bay-in-singapore-during-daytime"
  constructor(private dataStorageService: DataStorageService) {}

  async showHistory(){
    this.toShowHistory = true;
    await this.findHistory();
  }
  async findHistory() {
    this.dataStorageService.getWeatherHistoryByUser().then((data) => {
      data.subscribe({
        next: (data: any) => {
          this.historyReports = data;
          this.toShowHistory = true
          console.log(data)
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    });
  }

  ngOnDestroy() {
    this.historySusbcription?.unsubscribe();
  }
}
