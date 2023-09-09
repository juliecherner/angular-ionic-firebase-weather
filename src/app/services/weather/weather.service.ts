import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../../types/weather';
import { DateService } from '../date/date.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(
    private httpClient: HttpClient,
    private dateService: DateService,
  ) {}

  getCurrentByPosition(position: { latitude: number; longitude: number }) {
    return this.httpClient.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&units=metric&appid=0abdc5f43cb01dc2e2130b6a0aa1dd16`,
    );
  }

  getCurrentTimestamp(){
    return Math.floor((new Date()).getTime() / 1000);
  }

  transformResult(weather: any): Weather {
    return {
      timestamp: this.getCurrentTimestamp(),
      date: this.dateService.extractDateAndTime(this.getCurrentTimestamp()),
      lastUpdated:
        this.dateService.extractDateAndTime(weather?.dt) || 'Not defined',
      place: weather?.name || 'Not defined',
      country: weather?.sys?.country || 'Not defined',
      main: {
        feels_like: weather?.main?.feels_like || 0,
        humidity: weather?.main?.humidity || 0,
        pressure: weather?.main?.pressure || 0,
        temp: weather?.main?.temp || 0,
        temp_max: weather?.main?.temp_max || 0,
        temp_min: weather?.main?.temp_min || 0,
      },
    };
  }
}
