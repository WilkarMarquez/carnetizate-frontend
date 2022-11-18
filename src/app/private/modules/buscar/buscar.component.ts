import { Component, OnInit } from '@angular/core';
import { TurnsService } from 'src/app/service/turns.service';
import { recibirTurno } from 'src/app/models/recibirTurno';
import { userLogin } from 'src/app/models/userLogin';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  turnos: recibirTurno[] = [];
  estudiantes: userLogin[] = [];
  loading: boolean = false;


  constructor( private turnsService: TurnsService, private userService:UserService){ 

  }

  ngOnInit(){ 
    this.cargaDeTurnos();
  }

  cargaDeTurnos(){
    this.turnsService.getAllTurn().subscribe(
      (res: recibirTurno[]) => {
        res.forEach(element => {
          let turn: any = {};
          turn.id = element._id;
          turn.code = element.code;
          turn.start = element.start.replace('T', ' ');
          turn.status_id = 
          this.turnos.push(turn);
        });
      }
      );
  }
}
