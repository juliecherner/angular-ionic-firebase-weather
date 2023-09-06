import { Injectable } from '@angular/core';
import { CustomValidation, LOGIN_MODE } from '../../types/customValidation';
@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  customFormValidation(
    email: string,
    password: string,
    agreement: boolean,
    mode: Record<'mode', LOGIN_MODE>
  ): CustomValidation {

    const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
    const isPassword = /^.{8,}$/.test(password);

    let validationData: any = {};

    switch (mode.mode) {
      case LOGIN_MODE.SIGNIN: {
        Object.assign(validationData, {
          email: {
            error: !isEmail,
            text: isEmail ? '' : 'Should be correct email',
          },
          password: {
            error: !isPassword,
            text: isPassword ? '' : 'Should contain min 8 characters',
          },
        });

        break;
      }
      case LOGIN_MODE.SIGNUP: {
        Object.assign(validationData, {
          email: {
            error: !isEmail,
            text: isEmail ? '' : 'Should be correct email',
          },
          password: {
            error: !isPassword,
            text: isPassword ? '' : 'Should contain min 8 characters',
          },
          agreement: {
            error: !agreement,
            text: agreement ? '' : 'Agreement is required',
          },
        });

        break;
      }

      case LOGIN_MODE.RESTORE_PASSWORD: {
        Object.assign(validationData, {
          email: {
            error: !isEmail,
            text: isEmail ? '' : 'Should be correct email',
          },
        });

        break;
      }
      default:
        Object.assign(validationData, {
          email: {
            error: !isEmail,
            text: isEmail ? '' : 'Should be correct email',
          },
          password: {
            error: !isPassword,
            text: isPassword ? '' : 'Should contain min 8 characters',
          },
        });
    }

    return {
      error:
        validationData?.email?.error ||
        validationData?.password?.error ||
        validationData?.agreement?.error,
      data: validationData
    };
  }
}
