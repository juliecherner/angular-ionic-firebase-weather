import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor(private httpClient: HttpClient) {}

  async getCurrentPosition() {
    const position = await Geolocation.getCurrentPosition();
    return {
      latitude: position?.coords?.latitude,
      longitude: position?.coords?.longitude,
    };
  }

  getWeatherByCurrentPosition(position: {
    latitude: number;
    longitude: number;
  }) {
    const env = '0abdc5f43cb01dc2e2130b6a0aa1dd16';

    return this.httpClient.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${env}`,
    );
  }
}
