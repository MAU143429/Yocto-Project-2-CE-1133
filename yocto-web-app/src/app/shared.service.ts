import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private register = new BehaviorSubject<boolean>(false);
  register$ = this.register.asObservable();

  private login = new BehaviorSubject<boolean>(true);
  login$ = this.login.asObservable();

  cambiarRegister() {
    this.register.next(!this.register.getValue());
  }

  cambiarLogin() {
    this.register.next(!this.login.getValue());
  }
}
