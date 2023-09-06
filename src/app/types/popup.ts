export type ActionResult = {
  type: Popup;
  status: boolean;
  text: string;
};

export enum POPUP_TYPE {
  'SUCCESS' = 'success',
  'ERROR' = 'error',
}
export enum POPUP_COLOR {
  'success' = 'success',
  'error' = 'danger',
}

export type Popup = 'success' | 'error';
