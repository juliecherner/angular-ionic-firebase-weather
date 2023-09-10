import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../auth/auth.service';
import { WeatherReport } from 'src/app/types/weather';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
  ) {}

  async saveCurrentWeatherReport(
    weatherReport: Partial<WeatherReport> | null,
    imageUrl: string,
  ) {
    if (!weatherReport) throw new Error('Get weather!');

    const weatherCollection = this.db.list('weatherReports');

    const userLogin = await this.authService.getUserLogin();
    const reportWithUserAndPicture = Object.assign(weatherReport, {
      user: userLogin,
      imageUrl,
    });

    const documentKey = reportWithUserAndPicture?.timestamp?.toString() || '';

    weatherCollection.set(documentKey, reportWithUserAndPicture);
  }

  async getWeatherHistoryByUser() {
    const userLogin = await this.authService.getUserLogin();

    return this.db
      .list('/weatherReports', (ref) =>
        ref.orderByChild('user').equalTo(userLogin),
      )
      .valueChanges();
  }
}
