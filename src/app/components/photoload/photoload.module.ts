import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoloadComponent } from './photoload.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [PhotoloadComponent],
  exports: [PhotoloadComponent],
})
export class PhotoloadComponentModule {}
