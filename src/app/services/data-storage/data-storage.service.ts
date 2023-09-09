import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../auth/auth.service';
import { Weather } from 'src/app/types/weather';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
  ) {}

  async saveCurrentWeatherReport(weatherReport: Weather | null) {
    if (!weatherReport) throw new Error('Get weather!');

    const weatherCollection = this.db.list('weatherReports');

    const userLogin = await this.authService.getUserLogin();
    const reportWithUser = Object.assign(weatherReport, { user: userLogin });

    const documentKey = reportWithUser.timestamp.toString();

    weatherCollection.set(documentKey, reportWithUser);
  }

  async getWeatherHistoryByUser() {
    const userLogin = await this.authService.getUserLogin();

    return this.db
      .list('/weatherReports', (ref) =>
        ref.orderByChild('user').equalTo(userLogin),
      )
      .valueChanges()
      
  }
}
