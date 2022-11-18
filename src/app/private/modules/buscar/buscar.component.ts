import { Component, OnInit } from '@angular/core';
import { TurnsService } from 'src/app/service/turns.service';
import { recibirTurno } from 'src/app/models/recibirTurno';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  turnos: recibirTurno[] = [];
  loading: boolean = false;


  constructor( private turnsService: TurnsService){ 

  }

  ngOnInit(){ 
    this.cargaDeTurnos();
  }

  cargaDeTurnos(){
    let turn: any = {};
    this.turnsService.getAllTurn().subscribe(
      (res: recibirTurno[]) => {
        this.turnos = [];
        res.forEach(element => {
          turn.id = element._id;
          turn.code = element.code;
          turn.start = element.start.replace('T', ' ');
          turn.status_id = 
          console.log(turn);
        });
        this.turnos.push(turn);
      }
      );
  }
}
