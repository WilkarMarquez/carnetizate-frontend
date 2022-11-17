import { Component, OnInit } from '@angular/core';
import { userLogin } from 'src/app/models/userLogin';
import { AuthService } from 'src/app/service/autentication/auth.service';
import { TurnsService } from 'src/app/service/turns.service';
import { recibirTurno } from 'src/app/models/recibirTurno';
import { elementClosest } from '@fullcalendar/common';

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
        res.forEach(element => {
          turn.id = element._id;
          turn.code = element.code;
          turn.user_id = element.user_id;
          turn.end = element.end;
          turn.start = element.start;  
        });
        this.turnos.push(turn);
      }
      );
  }
}
