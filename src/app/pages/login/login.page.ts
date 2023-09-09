import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { timer, Subscription } from 'rxjs';
import { ValidationService } from '../../services/validation/validation.service';
import { AuthService } from '../../services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { CustomValidation, LOGIN_MODE } from '../../types/customValidation';
import { ActionResult, POPUP_TYPE } from '../../types/popup';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnDestroy {
  constructor(
    private validationService: ValidationService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private popupService: PopupService,
  ) {}

  email: string = '';
  password: string = '';
  agreement: boolean = false;
  toRemember: boolean = true;

  toRestore: boolean = false;
  modeIsSignIn: boolean = true;

  isLoading: boolean = false;

  toShowPopup: ActionResult = {
    status: false,
    type: POPUP_TYPE.ERROR,
    text: '',
  };

  customValidation: CustomValidation | null = null;

  popupSubscription: Subscription | null = null;

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

  showAndHidePopup(type: POPUP_TYPE, text: string, delay: number) {
    this.toShowPopup = this.popupService.show(type, text);

    setTimeout(() => {
      this.toShowPopup = this.popupService.hide();
    }, delay);

    this.popupSubscription = timer(delay).subscribe(async () => {
      this.toShowPopup = this.popupService.hide();
    });
  }

  async manageUserSave(userLogin: string, toRemember: boolean) {
    this.authService.setSessionUser(userLogin);
    if (toRemember) await this.localStorageService.saveUserInfo(this.email);
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
          await this.authService.login(this.email, this.password);
          await this.manageUserSave(this.email, this.toRemember);
          this.router.navigate(['/tabs/tab1']);
        } catch (error: any) {
          this.showAndHidePopup(POPUP_TYPE.ERROR, error, 5000);
        }

        break;
      case LOGIN_MODE.SIGNUP:
        try {
          await this.authService.signup(this.email, this.password);
          this.showAndHidePopup(
            POPUP_TYPE.SUCCESS,
            'Signed up successfully. Now log in',
            2000,
          );
          this.changeLoginMode();
        } catch (error: any) {
          this.showAndHidePopup(POPUP_TYPE.ERROR, error, 7000);
        }

        break;
      case LOGIN_MODE.RESTORE_PASSWORD:
        try {
          await this.authService.restorePassword(this.email);
          this.showAndHidePopup(
            POPUP_TYPE.SUCCESS,
            'Instuctions are send to email',
            3000,
          );
          this.changeRestoreMode();
        } catch (error: any) {
          this.showAndHidePopup(POPUP_TYPE.ERROR, error, 3000);
        }

        break;
      default:
        break;
    }
  }

  ngOnDestroy() {
    this.popupSubscription?.unsubscribe();
  }
}
