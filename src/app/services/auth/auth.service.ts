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

  user: string | null = null;

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

  setSessionUser(userLogin: string) {
    this.user = userLogin;
  }

  isSessionUser() {
    return Boolean(this.user);
  }

  async isLoggedIn() {
    return (await this.localStorageService.isUser()) || this.isSessionUser();
  }

  getSessionUserLogin() {
    return this.user;
  }

  async getUserLogin(): Promise<string> {
    return (await this.localStorageService.isUser())
      ? this.localStorageService.getUserLogin()
      : this.getSessionUserLogin();
  }
}
