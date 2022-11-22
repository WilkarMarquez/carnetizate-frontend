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
  basicData: any;
  horizontalOptions: any;

  estReser = 0;
  estEnPro = 0;
  estTerm = 0;
  estCan = 0;

  renovados: number[] = [0,0,0,0,0];
  primeVez: number[] = [0,0,0,0,0];

  primeraVez: number = 0;
  numTurnosManana:number = 0;
  turnosNoResueltos: number = 0;
  renovar = 0;
  constructor(private loadingService:LoadingService, private turnService: TurnsService) { 
    this.loadingService.mostrarCargando();
    this.turnos = [];
  }

  ngOnInit(){
    this.turnService.getAllTurn().subscribe(
      (res) => {
        let ahora = Date.now();
        this.turnos = res;
        this.turnos.forEach(element => {
          if((new Date(element.start).getDate() > new Date(ahora).getDate()) && (element.status_id == 1 || element.status_id == 2)){
            this.turnosNoResueltos ++;
          }
        });
      }
    );
      setTimeout(() => {
        this.turnosHoy();
        this.cargarTorta();
        this.turnosManana();
        this.datosCargarBarra();
        this.cargarBarra();
        this.loadingService.ocultarCargando();
      }, 1000);
  }

  turnosManana(){
    let ahora = Date.now();
    this.turnos.forEach(iter => {
      if(new Date(iter.start).getDate() == new Date(ahora).getDate() + 1){
        this.numTurnosManana ++;
        iter.ispay? this.renovar++ : this.primeraVez++; 
      } 
    });
  }

  turnosHoy(){
    let ahora = Date.now();
    this.turnos.forEach(iter => {
      if(new Date(iter.start).getDate() == new Date(ahora).getDate()){
        if(iter.status_id == 1){
          this.estReser ++;
        }else if(iter.status_id == 2){
          this.estEnPro ++;
        }else if(iter.status_id == 3){
          this.estTerm ++;
        }else if(iter.status_id == 4){
          this.estCan ++;
        }
      } 
    }); 
  }

  getNumberOfWeek(today: Date) {
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today.valueOf() - firstDayOfYear.valueOf()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

  datosCargarBarra(){
    this.turnos.forEach(element => {
      let fecha = new Date(element.start);
      if(this.getNumberOfWeek(fecha) == this.getNumberOfWeek(new Date())){
        if(element.ispay == true){
          if(fecha.getDay() == 1) { this.renovados[1] ++ }
          if(fecha.getDay() == 2) { this.renovados[2] ++ }
          if(fecha.getDay() == 3) { this.renovados[3] ++ }
          if(fecha.getDay() == 4) { this.renovados[4] ++ }
          if(fecha.getDay() == 5) { this.renovados[5] ++ }
        }else if(element.ispay == false){
          if(fecha.getDay() == 1) { this.primeVez[1] ++ }
          if(fecha.getDay() == 2) { this.primeVez[2] ++ }
          if(fecha.getDay() == 3) { this.primeVez[3] ++ }
          if(fecha.getDay() == 4) { this.primeVez[4] ++ }
          if(fecha.getDay() == 5) { this.primeVez[5] ++ }
        } 
      }
    });
  }

  cargarBarra(){
    this.basicData = {
      labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
      datasets: [
          {
              label: 'Renovar',
              backgroundColor: '#FF6384',
              data: [this.renovados[1], this.renovados[2], this.renovados[3], this.renovados[4], this.renovados[5]]
          },
          {
              label: 'Primera vez',
              backgroundColor: '#FFCE56',
              data: [this.primeVez[1], this.primeVez[2], this.primeVez[3], this.primeVez[4], this.primeVez[5]]
          }
      ]
    };

    this.horizontalOptions = {
      indexAxis: 'y',
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          }
      }
  };
  }

  cargarTorta(){
    this.dataTorta = {
      labels: ['Reservado','En proceso','Terminado','Cancelado'],
      datasets: [
        {
          data: [this.estReser, this.estEnPro, this.estTerm, this.estCan],
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
