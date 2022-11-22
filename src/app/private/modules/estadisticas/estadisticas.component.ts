import { Component, OnInit } from '@angular/core';
import { TurnsService } from 'src/app/service/turns.service';
import { LoadingService } from 'src/app/service/loading.service';
import { recibirTurno } from 'src/app/models/recibirTurno';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  turnos: recibirTurno [];
  dataTorta: any;
  primeraVez: number = 0;
  numTurnosManana:number = 0;
  renovar = 0;
  constructor(private loadingService:LoadingService, private turnService: TurnsService) { 
    this.loadingService.mostrarCargando();
    this.turnos = [];
  }

  ngOnInit(){
    this.turnService.getAllTurn().subscribe(
      (res) => {
        this.turnos = res;
      }
    );
      setTimeout(() => {
        this.cargarTorta();
        this.turnosManana();
        this.loadingService.ocultarCargando();
      }, 1000);
  }

  turnosManana(){
    this.turnos.forEach(iter => {
      console.log(iter);
      if(new Date(iter.start).getDay() == Date.now()){
        this.numTurnosManana ++;
      } 
    });
  }

  cargarTorta(){
    this.dataTorta = {
      labels: ['Reservado','En proceso','Terminado','Cancelado'],
      datasets: [
        {
          data: [300, 50, 100,10],
          backgroundColor: [
            "#0183EF",
            "#FF9400",
            "#829F00",
            "#A50400"
          ],
          hoverBackgroundColor: [
            "#0183EF",
            "#FF9400",
            "#829F00",
            "#A50400"
          ]
        }
      ]
    };
  }


}
