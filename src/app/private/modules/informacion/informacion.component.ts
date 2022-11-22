import { Component, OnInit } from '@angular/core';
import { TurnsService } from 'src/app/service/turns.service';
import { recibirTurno } from 'src/app/models/recibirTurno';
import { LoadingService } from 'src/app/service/loading.service';
import { AuthService } from 'src/app/service/autentication/auth.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

  loading: boolean = false;
  
  turnos: recibirTurno[] = [];
  muestralo: boolean;
  user: string | undefined;

  constructor(private loadingService:LoadingService, private turnsService: TurnsService, private authService:AuthService){
    this.muestralo = false;
    this.loadingService.mostrarCargando();
  }

  ngOnInit(){ 
    this.user = this.authService.getDatosAutenticacion()?.id;
    this.turnsService.getAllTurn()
      .subscribe(
        (res)=>{
          res.forEach(element => {
            if(this.user == element.user_id){
              let turn: any = {};
              turn.code = element.code;
              turn.start = new Date(element.start);
              element.queue_id == '636ffae407758b383399bca1'? turn.tipo = 'Primera vez': turn.tipo = 'Renovar';
              turn.status_id = element.status_id;
              this.turnos.push(turn);
            }
            this.muestralo = true;
          });
          this.loadingService.ocultarCargando();
        }
      );
  }
}