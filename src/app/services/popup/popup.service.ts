import { Injectable } from '@angular/core';
import { POPUP_TYPE } from '../../types/popup';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor() {}

  show(type: POPUP_TYPE, customText?: string) {
    return {
      status: true,
      type,
      text:
        customText ||
        (type === POPUP_TYPE.SUCCESS ? 'Succeeded!' : 'Unexpected error'),
    };
  }

  hide() {
    return {
      status: false,
      type: POPUP_TYPE.ERROR,
      text: '',
    };
  }
}
