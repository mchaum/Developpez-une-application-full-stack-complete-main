import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionInformation } from '../interfaces/sessionInformation.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private isLoggedSubject = new BehaviorSubject<boolean>(false);
  public sessionInformation: SessionInformation | undefined;

  constructor() {
    this.checkInitialLoginState();
  }

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public logIn(user: SessionInformation): void {
    this.sessionInformation = user;
    localStorage.setItem('authToken', user.token);
    this.updateLoginState(true);
  }

  public logOut(): void {
    this.sessionInformation = undefined;
    localStorage.removeItem('authToken'); 
    this.updateLoginState(false);
  }

  private updateLoginState(isLogged: boolean): void {
    this.isLoggedSubject.next(isLogged);
  }

  private checkInitialLoginState(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.updateLoginState(true);
    } else {
      this.updateLoginState(false);
    }
  }
}
