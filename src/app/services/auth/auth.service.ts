import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { ActionResult } from '../../types/popup';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public firebaseAuth: AngularFireAuth,
    private localStorageService: LocalStorageService,
  ) {}

  isLoading: boolean = false;
  error: ActionResult = {
    type: 'error',
    status: false,
    text: '',
  };

  async login(email: string, password: string) {
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

  async isLoggedIn() {
    return await this.localStorageService.isUser();
  }

}
