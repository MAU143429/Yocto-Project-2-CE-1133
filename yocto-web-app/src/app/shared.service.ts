import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  lucesIniciales: any = {};
  constructor() { }

  // VARIABLES ===================================================================================================================
  private register = new BehaviorSubject<boolean>(false);
  register$ = this.register.asObservable();

  private login = new BehaviorSubject<boolean>(false);
  login$ = this.login.asObservable();

  private luces = new BehaviorSubject<JSON>(this.lucesIniciales);
  luces$ = this.luces.asObservable();

  private color_encendido = new BehaviorSubject<string>("#1cc88a");
  color_encendido$ = this.color_encendido.asObservable();

  private color_apagado = new BehaviorSubject<string>("#e74a3b");
  color_apagado$ = this.color_apagado.asObservable();

  private clase_encendido = new BehaviorSubject<string>("card border-left-success shadow h-100 py-2 clickable-card");
  clase_encendido$ = this.clase_encendido.asObservable();

  private clase_apagado = new BehaviorSubject<string>("card border-left-danger shadow h-100 py-2 clickable-card" );
  clase_apagado$ = this.clase_apagado.asObservable();

  private icono_encendido = new BehaviorSubject<string>("fa-solid fa-toggle-on");
  icono_encendido$ = this.icono_encendido.asObservable();

  private icono_apagado = new BehaviorSubject<string>("fa-solid fa-toggle-off");
  icono_apagado$ = this.icono_apagado.asObservable();

  private texto_encendido = new BehaviorSubject<string>("text-xs font-weight-bold text-success text-uppercase mb-1");
  texto_encendido$ = this.texto_encendido.asObservable();

  private texto_apagado = new BehaviorSubject<string>("text-xs font-weight-bold text-danger text-uppercase mb-1");
  texto_apagado$ = this.texto_apagado.asObservable();

  private data_luces = new BehaviorSubject<any>({
      "luz1": document.getElementById("luz1") as HTMLDivElement,
      "luz1TEXTO": document.getElementById("luz1TEXTO") as HTMLDivElement,
      "luz1ICONO": document.getElementById("luz1ICONO") as HTMLInputElement,

      "luz2": document.getElementById("luz2") as HTMLDivElement,
      "luz2TEXTO": document.getElementById("luz2TEXTO") as HTMLDivElement,
      "luz2ICONO": document.getElementById("luz2ICONO") as HTMLInputElement,

      "luz3": document.getElementById("luz3") as HTMLDivElement,
      "luz3TEXTO": document.getElementById("luz3TEXTO") as HTMLDivElement,
      "luz3ICONO": document.getElementById("luz3ICONO") as HTMLInputElement,

      "luz4": document.getElementById("luz4") as HTMLDivElement,
      "luz4TEXTO": document.getElementById("luz4TEXTO") as HTMLDivElement,
      "luz4ICONO": document.getElementById("luz4ICONO") as HTMLInputElement,

      "luz5": document.getElementById("luz5") as HTMLDivElement,
      "luz5TEXTO": document.getElementById("luz5TEXTO") as HTMLDivElement,
      "luz5ICONO": document.getElementById("luz5ICONO") as HTMLInputElement
    });
  data_luces$ = this.data_luces.asObservable();

  // =============================================================================================================================

  cambiarRegister() {
    this.register.next(!this.register.getValue());
  }

  cambiarLogin() {
    this.register.next(!this.login.getValue());
  }

  // FUNCIONES SET ===============================================================================================================

  setLuces(luces: any) {
    console.log('Actualizando luces en servicio:', luces); // ← Para depuración
    this.luces.next(luces);
  }

  setDataLuces(data: any) {
    this.data_luces.next(data);
  }

  // ============================================================================================================================

  // FUNCIONES GET
  getLuces() {
    const currentLuces = this.luces.getValue();
    console.log("Obteniendo luces actuales: ", currentLuces);
    return currentLuces;
  }

  getColorEncendido() {
    return this.color_encendido.getValue();
  }
  
  getColorApagado() {
    return this.color_apagado.getValue();
  }
  
  getClaseEncendido() {
    return this.clase_encendido.getValue();
  }

  getClaseApagado() {
    return this.clase_apagado.getValue();
  }

  getIconoEncendido() {
    return this.icono_encendido.getValue();
  }

  getIconoApagado() {
    return this.icono_apagado.getValue();
  }

  getTextoEncendido() {
    return this.texto_encendido.getValue();
  }

  getTextoApagado() {
    return this.texto_apagado.getValue();
  }

  getDataLuces() {
    return this.data_luces.getValue();
  }

}
