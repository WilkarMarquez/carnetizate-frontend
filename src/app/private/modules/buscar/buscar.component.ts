import { Component, OnInit } from '@angular/core';
import { TurnsService } from 'src/app/service/turns.service';
import { recibirTurno } from 'src/app/models/recibirTurno';
import { UserService } from 'src/app/service/user.service';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  turnos: recibirTurno[] = [];
  estudiantes: any[] = [];
  loading: boolean = false;


  constructor(private loadingService:LoadingService, private turnsService: TurnsService, private userService:UserService){
    this.loadingService.mostrarCargando();
  }

  ngOnInit(){ 
    this.estudiantes = this.infoEstudiantes();
    setTimeout(() => {
      this.turnos = this.cargaDeTurnos();
      this.loadingService.ocultarCargando();
    }, 1000);
  }

  infoEstudiantes(){
    this.userService.obtenerUsuarios().subscribe(res => {
      this.estudiantes = res;
    });
    return this.estudiantes;
  }

  cargaDeTurnos(){
    this.turnsService.getAllTurn().subscribe(
      (res: recibirTurno[]) => {
        res.forEach(element => {
          let turn: any = {};
          turn.id = element._id;
          turn.user_id = element.user_id;
          turn.code = element.code;
          turn.start = new Date(element.start);
          turn.status_id = element.status_id;
          this.estudiantes.find(e => {
            if(e._id == turn.user_id){
              turn.username = e.username;
              turn.name = e.firts_name + ' ' + e.last_name;
            }
          });
          this.turnos.push(turn);
        });
      }
    );
    return this.turnos;
  }
}
