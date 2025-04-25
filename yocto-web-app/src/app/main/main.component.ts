import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  data_luces:any = {};
  estados_luces:any = {};
  estados_puertas:any = {};
  data_puertas:any = {};
  constructor(private api:APIService, private shared:SharedService) {};

  setAllEstados(){
    Object.keys(this.estados_luces).forEach((luz) => {
      console.log(this.estados_luces[luz]);
      if(this.estados_luces[luz]){
        this.data_luces[luz].className = this.shared.getClaseEncendido();
        this.data_luces[luz+"TEXTO"].className = this.shared.getTextoEncendido();
        this.data_luces[luz+"ICONO"].className = this.shared.getIconoEncendido();
        this.data_luces[luz+"ICONO"].style.color = this.shared.getColorEncendido();
      }
      else{
        this.data_luces[luz].className = this.shared.getClaseApagado();
        this.data_luces[luz+"TEXTO"].className = this.shared.getTextoApagado();
        this.data_luces[luz+"ICONO"].className = this.shared.getIconoApagado();
        this.data_luces[luz+"ICONO"].style.color = this.shared.getColorApagado();
      }
    });
    Object.keys(this.estados_puertas).forEach((puerta) => {
      console.log(this.estados_puertas[puerta]);
      if(this.estados_puertas[puerta]){
        this.data_puertas[puerta].className = this.shared.getClaseEncendido();
        this.data_puertas[puerta+"TEXTO"].className = this.shared.getTextoEncendido();
        this.data_puertas[puerta+"ICONO"].className = this.shared.getIconoEncendido();
        this.data_puertas[puerta+"ICONO"].style.color = this.shared.getColorEncendido();
      }
      else{
        this.data_puertas[puerta].className = this.shared.getClaseApagado();
        this.data_puertas[puerta+"TEXTO"].className = this.shared.getTextoApagado();
        this.data_puertas[puerta+"ICONO"].className = this.shared.getIconoApagado();
        this.data_puertas[puerta+"ICONO"].style.color = this.shared.getColorApagado();
      }
    });
  }


  ngOnInit(): void {
    const data = {
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
    }
    const dataPuer = {
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
    }
    this.shared.setDataPuertas(dataPuer);
    this.estados_puertas = this.shared.getPuertas();

    this.shared.setDataLuces(data);
    this.estados_luces = this.shared.getLuces();
    this.setAllEstados();
    /*
    this.data_luces.luz1.className = this.shared.getClaseApagado();
    this.data_luces.luz1TEXTO.className = this.shared.getTextoApagado();
    this.data_luces.luz1ICONO.className = this.shared.getIconoApagado();
    this.data_luces.luz1ICONO.style.color = this.shared.getColorApagado(); */
  };



  //setEstado()
}
