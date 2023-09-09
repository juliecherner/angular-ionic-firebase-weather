import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoryPage } from './history.page';
import { LoaderComponentModule } from '../../components/loader/loader.module';

import { HistoryPageRoutingModule } from './history-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HistoryPageRoutingModule,
    LoaderComponentModule,
  ],
  declarations: [HistoryPage],
})
export class HistoryPageModule {}
