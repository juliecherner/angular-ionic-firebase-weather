export type CustomValidation = { error: boolean; data: ValidationItem };

type ValidationKey = 'email' | 'password' | 'agreement';

type ValidationOutput = {
  error: boolean;
  text: string;
};

type ValidationItem = Record<ValidationKey, ValidationOutput>;

export enum LOGIN_MODE {
  'SIGNIN' = 'signin',
  'SIGNUP' = 'signup',
  'RESTORE_PASSWORD' = 'restore-password',
}
