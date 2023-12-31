import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { PopupComponentModule } from '../../components/popup/popup.module';
import { LoaderComponentModule } from '../../components/loader/loader.module';

import { LoginPageRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LoginPageRoutingModule,
    PopupComponentModule,
    LoaderComponentModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
