import { Component, OnInit } from '@angular/core';
import { TurnsService } from 'src/app/service/turns.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  turnos: any [];
  dataTorta: any;
  constructor(private turnService: TurnsService) { 
    this.turnos = [];
  }

  ngOnInit(){
    this.turnService.getAllTurn().subscribe(
      (res) => {
        this.turnos = res;
      }
    );

    this.cargarTorta();
  }

  turnosManana(){
    this.turnos.forEach(iter => {
      
    });
  }

  cargarTorta(){
    this.dataTorta = {
      labels: ['A','B','C','D'],
      datasets: [
        {
          data: [300, 50, 100,10],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#F00"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56","#F"
          ]
        }
      ]
    };
  }


}
