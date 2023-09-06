import { Component } from '@angular/core';
import { ValidationService } from '../../services/validation/validation.service';
import { AuthService } from '../../services/auth/auth.service';
import { CustomValidation, LOGIN_MODE } from '../../types/customValidation';
import { ActionResult, POPUP_TYPE } from '../../types/popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  constructor(
    private validationService: ValidationService,
    private authService: AuthService,
    private router: Router,
  ) {}

  email: string = '';
  password: string = '';
  agreement: boolean = false;
  toRemember: boolean = false;

  toRestore: boolean = false;
  modeIsSignIn: boolean = true;

  isLoading: boolean = false;

  toShowPopup: ActionResult = {
    status: false,
    type: 'error',
    text: '',
  };

  customValidation: CustomValidation | null = null;

  onInit() {}

  changeLoginMode() {
    this.modeIsSignIn = !this.modeIsSignIn;
    this.clearValidation();
  }

  changeRestoreMode() {
    this.toRestore = !this.toRestore;
    this.clearValidation();
  }

  clearValidation() {
    this.customValidation = null;
  }

  defineAuthMode() {
    if (this.toRestore) return { mode: LOGIN_MODE.RESTORE_PASSWORD };
    return this.modeIsSignIn
      ? { mode: LOGIN_MODE.SIGNIN }
      : { mode: LOGIN_MODE.SIGNUP };
  }

  clearPopupData(miliseconds: number) {
    setTimeout(() => {
      this.toShowPopup = {
        status: false,
        text: '',
        type: 'error',
      };
    }, miliseconds);
  }

  showPopup(type: POPUP_TYPE, customText?: string) {
    this.toShowPopup = {
      status: true,
      type,
      text:
        customText ||
        (type === POPUP_TYPE.SUCCESS ? 'Succeeded!' : 'Unexpected error'),
    };

    const delayMiliseconds = type === POPUP_TYPE.SUCCESS ? 2000 : 7000;
    this.clearPopupData(delayMiliseconds);
  }

  async login() {
    const currentMode = this.defineAuthMode();
    this.customValidation = this.validationService.customFormValidation(
      this.email,
      this.password,
      this.agreement,
      currentMode,
    );
    if (this.customValidation.error) return;

    switch (currentMode.mode) {
      case LOGIN_MODE.SIGNIN:
        try {
          await this.authService.login(
            this.email,
            this.password,
            this.toRemember,
          );
          this.showPopup(POPUP_TYPE.SUCCESS);
          this.router.navigate(['/tabs/tab1']);
        } catch (error: any) {
          this.showPopup(POPUP_TYPE.ERROR, error);
        }

        break;
      case LOGIN_MODE.SIGNUP:
        try {
          await this.authService.signup(this.email, this.password);
          this.showPopup(POPUP_TYPE.SUCCESS);
          this.changeLoginMode();
        } catch (error: any) {
          this.showPopup(POPUP_TYPE.ERROR, error);
        }

        break;
      case LOGIN_MODE.RESTORE_PASSWORD:
        try {
          await this.authService.restorePassword(this.email);
          this.showPopup(POPUP_TYPE.SUCCESS);
          this.changeRestoreMode();
        } catch {
          this.showPopup(POPUP_TYPE.ERROR);
        }

        break;
      default:
        break;
    }
  }
}
