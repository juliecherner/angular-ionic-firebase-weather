export type Weather = {
  timestamp: number;
  date: string;
  lastUpdated: string;
  place: string;
  country: string;
  main: TemperatureCelsius;
};

type TemperatureCelsius = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};
