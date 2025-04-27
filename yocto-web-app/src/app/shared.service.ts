
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  lucesIniciales: any = {};
  puertasIniciales: any = {};

  puertos_luces: any = {
    luz1: 27,
    luz2: 5,
    luz3: 17,
    luz4: 22,
    luz5: 6
  };

  constructor(private api:APIService) { }

  // VARIABLES ===================================================================================================================
  private register = new BehaviorSubject<boolean>(false);
  register$ = this.register.asObservable();

  private login = new BehaviorSubject<boolean>(true);
  login$ = this.login.asObservable();

  private luces = new BehaviorSubject<JSON>(this.lucesIniciales);
  luces$ = this.luces.asObservable();

  private puertas = new BehaviorSubject<JSON>(this.puertasIniciales);
  puertas$ = this.puertas.asObservable();

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

  private data_puertas = new BehaviorSubject<any>({
    "puerta_delantera": document.getElementById("puerta_delantera") as HTMLDivElement,
    "puerta_delanteraTEXTO": document.getElementById("puerta_delanteraTEXTO") as HTMLDivElement,
    "puerta_delanteraICONO": document.getElementById("puerta_delanteraICONO") as HTMLInputElement,

    "puerta_bano": document.getElementById("puerta_bano") as HTMLDivElement,
    "puerta_banoTEXTO": document.getElementById("puerta_banoTEXTO") as HTMLDivElement,
    "puerta_banoICONO": document.getElementById("puerta_banoICONO") as HTMLInputElement,

    "puerta_cuarto1": document.getElementById("puerta_cuarto1") as HTMLDivElement,
    "puerta_cuarto1TEXTO": document.getElementById("puerta_cuarto1TEXTO") as HTMLDivElement,
    "puerta_cuarto1ICONO": document.getElementById("puerta_cuarto1ICONO") as HTMLInputElement,

    "puerta_cuarto2": document.getElementById("puerta_cuarto2") as HTMLDivElement,
    "puerta_cuarto2TEXTO": document.getElementById("puerta_cuarto2TEXTO") as HTMLDivElement,
    "puerta_cuarto2ICONO": document.getElementById("puerta_cuarto2ICONO") as HTMLInputElement,
  });
  data_puertas$ = this.data_puertas.asObservable();

  // =============================================================================================================================

  cambiarRegister() {
    this.register.next(!this.register.getValue());
  }

  cambiarLogin() {
    this.register.next(!this.login.getValue());
  }

  // FUNCIONES SET ===============================================================================================================

  setLuces(luces: any) {
    this.luces.next(luces);
  }

  setPuertas(puertas: any) {
    this.puertas.next(puertas);
  }

  setDataLuces(data: any) {
    this.data_luces.next(data);
  }

  setDataPuertas(data: any) {
    this.data_puertas.next(data);
  }

  // ============================================================================================================================

  // FUNCIONES GET
  getLuces() {
    const currentLuces = this.luces.getValue();
    return currentLuces;
  }

  getPuertas() {
    const currentPuertas = this.puertas.getValue();
    return currentPuertas;
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

  getDataPuertas() {
    return this.data_puertas.getValue();
  }

  cambiadorEstado(value:boolean){
    if(value){
      return 1;
    }
    else{
      return 0;
    }
  }

  cambiar_id_luz(id_luz: string){
    const luces = this.puertos_luces;
    // @ts-ignore
    const id = luces[id_luz];
    return id;
  }

  cambiarColorBoton(luz: string){
    const luces = this.luces.getValue();
    const data_luces = this.data_luces.getValue();
    // @ts-ignore
    if(luces[luz]){
      data_luces[luz].className = this.getClaseEncendido();
      data_luces[luz+"TEXTO"].className = this.getTextoEncendido();
      data_luces[luz+"ICONO"].className = this.getIconoEncendido();
      data_luces[luz+"ICONO"].style.color = this.getColorEncendido();
    }
    else{
      data_luces[luz].className = this.getClaseApagado();
      data_luces[luz+"TEXTO"].className = this.getTextoApagado();
      data_luces[luz+"ICONO"].className = this.getIconoApagado();
      data_luces[luz+"ICONO"].style.color = this.getColorApagado();
    }
    this.data_luces.next(data_luces);
  }


  setEstadoLuz(luz: string){
    const luces = this.luces.getValue();
    // @ts-ignore
    luces[luz] = !luces[luz];
    // @ts-ignore
    this.api.setLight(this.cambiar_id_luz(luz), this.cambiadorEstado(luces[luz])).subscribe((response: any) => {
      this.luces.next(luces);
      this.cambiarColorBoton(luz);
    }, (error: any) => {
      console.error("Error al actualizar el estado de la luz:", error);
    });
  }
  setLogin(value: boolean){
    this.login.next(value);
  }
  setRegister(value: boolean){
    this.register.next(value);
  }
}
