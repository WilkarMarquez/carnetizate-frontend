import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MensajesService } from 'src/app/service/mensajes.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss'],
  animations:[
    trigger('mensajeAnimado',[
      transition('void => *', [
        animate('150ms', keyframes([
          style({ transform: 'scale(0.9, 1.1) translateY(-100px)' }),
          style({ transform: 'scale(1.05, 0.95) translateY(0)' }),
          style({ transform: 'scale(1,1) translateY(-7px)' }),
          style({ transform: 'scale(1,1) translateY(0)' })
        ]))
      ]),
      transition('* => void', [
        animate('100ms', keyframes([
          style({ transform: 'scale(1,1) translateY(0)' }),
          style({ transform: 'scale(1,1) translateY(-7px)' }),
          style({ transform: 'scale(1.05, 0.95) translateY(0)' }),
          style({ transform: 'scale(0.9, 1.1) translateY(-100px)' })
        ]))
      ])
    ])
  ]
})
export class MensajesComponent {

  constructor(public mensajeService:MensajesService) { }

  cerrarMesajes(){
    this.mensajeService.limpiarMensajes();
  }

}