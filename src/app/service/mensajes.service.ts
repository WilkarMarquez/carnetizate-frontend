import { Injectable } from '@angular/core';
import { Mensaje } from '../models/mensaje';
import mensajesApp from 'src/assets/json/mensajes.json';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  mensajes: Mensaje[] = [];
  timeOut: any = null;

  agregarMensajeNotificacion(mensaje: Mensaje, limpiar: boolean = true, autoCerrar: boolean = true) {
    mensaje.resumen = this.getMensajeAplicacion(mensaje.resumen);
    this.agregarMensaje(mensaje,limpiar,autoCerrar);
  }

  agregarMensaje(mensaje: Mensaje, limpiar: boolean = true, autoCerrar: boolean = true) {
    if(limpiar){
      this.limpiarMensajes();
    }
    if(autoCerrar){
      this.timeOut = setTimeout(() => {
        this.limpiarMensajes();
        this.timeOut = null;
      }, 10000);
    }
    this.mensajes.push(mensaje);
  }

  limpiarMensajes() {
    clearTimeout(this.timeOut);
    this.mensajes = [];
  }

  getMensajeAplicacion(llaveMensaje:string){
    return mensajesApp[llaveMensaje as keyof typeof mensajesApp];
  }

}
