import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrentWeatherPage } from './current-weather.page';
import { CurrentWeatherPageRoutingModule } from './current-weather-routing.module';
import { PopupComponentModule } from '../../components/popup/popup.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CurrentWeatherPageRoutingModule,
    PopupComponentModule,
  ],
  declarations: [CurrentWeatherPage],
})
export class CurrentWeatherPageModule {}
