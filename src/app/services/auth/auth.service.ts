import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActionResult } from '../../types/popup';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public firebaseAuth: AngularFireAuth) {}

  isLoading: boolean = false;
  error: ActionResult = {
    type: 'error',
    status: false,
    text: '',
  };

  async login(email: string, password: string, toRemember: boolean) {
    //set to local storage
    return await this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  async signup(email: string, password: string) {
    return await this.firebaseAuth.createUserWithEmailAndPassword(
      email,
      password,
    );
  }

  async restorePassword(email: string) {
    return await this.firebaseAuth.sendPasswordResetEmail(email);
  }

  isLoggedIn() {
    //get from local storage
    return false;
  }
}
