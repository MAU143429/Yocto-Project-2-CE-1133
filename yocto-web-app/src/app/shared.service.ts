import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private register = new BehaviorSubject<boolean>(false);
  register$ = this.register.asObservable();


  cambiarRegister() {
    this.register.next(!this.register.getValue());
  }
}
