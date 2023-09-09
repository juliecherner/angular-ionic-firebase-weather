import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  extractDateAndTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);

    const monthNames: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = (minutes < 10 ? '0' : '') + minutes;

    return `${monthNames[month]} ${day}, ${year} ${hours}:${formattedMinutes}`;
  }
}
