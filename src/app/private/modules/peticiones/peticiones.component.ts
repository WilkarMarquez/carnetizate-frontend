import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin  from '@fullcalendar/timegrid';
import esLocale  from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';
import { TurnsService } from 'src/app/service/turns.service';
import { recibirTurno } from 'src/app/models/recibirTurno';
import { UserService } from 'src/app/service/user.service';
import { LoadingService } from 'src/app/service/loading.service';
import { MensajesService } from 'src/app/service/mensajes.service';

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.scss']
})
export class PeticionesComponent implements OnInit {

  @ViewChild('peticiones') peticiones:FullCalendarComponent | undefined;
  mostrarInfo: boolean;
  infoFechaSeleccionada: {};
  events: recibirTurno[] = [];
  turnoSeleccionado: any;

  constructor(private mensajeService:MensajesService, private loadingService: LoadingService ,private turnService: TurnsService, private userService: UserService) {
    this.mostrarInfo =  false;
    this.infoFechaSeleccionada = Date();
    this.turnoSeleccionado = {};
    this.loadingService.mostrarCargando();
    this.obtenerTurnos();
  }

  calendarOptions: CalendarOptions = {
    locale:esLocale,
    weekends: false,
    slotDuration:{minutes:5},
    allDaySlot: false,
    slotLabelFormat: { hour: 'numeric', minute: '2-digit', omitZeroMinute: false, hour12: false, meridiem: 'short'},
    dayHeaderFormat: {weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true},
    nowIndicator: true,
    firstDay: 1,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
    },
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    slotMinTime: "08:00:00",
    slotMaxTime: "18:00:00",
    height: '95%'
  };

  ngOnInit(): void {
    this.motrarInformacionTurno();
    setTimeout(() => {
      this.calendarOptions.events = this.events;
      this.loadingService.ocultarCargando();
    }, 1000);
  }

  motrarInformacionTurno():void{
    this.calendarOptions.eventClick = (info) => {
      this.loadingService.mostrarCargando();
      this.userService.obtenerUsuarios().subscribe((res: any) =>{
        res.forEach((iter:any) =>{
            if(info.event.extendedProps['user_id'] == iter._id){
              info.event.setExtendedProp("name", iter.firts_name + ' ' + iter.last_name);
              info.event.setExtendedProp("username", iter.username);
              this.turnoSeleccionado = info.event.extendedProps;
              this.loadingService.ocultarCargando();
              this.mostrarInfo = true;
              return;
            }
          }
          );
        });
    }
  }

  cancelarReanudarTurno(turno: any){
    this.loadingService.mostrarCargando();
    if(turno.status_id == 4){
      this.turnService.cambiarEstado({turn_id: turno._id, status_id: 2}).subscribe(res => {
        this.loadingService.ocultarCargando();
        this.mensajeService.agregarMensajeNotificacion({resumen:"estadoTurno", severidad: "success"});
        this.mostrarInfo = false;
      });
    }else{
      this.turnService.cambiarEstado({turn_id: turno._id, status_id: 4}).subscribe(res => {
          this.loadingService.ocultarCargando();
          this.mensajeService.agregarMensajeNotificacion({resumen:"estadoTurno", severidad: "success"});
          this.mostrarInfo = false;
        }
      );
    }
  }

  cambiarEstado(turno: any){
    this.loadingService.mostrarCargando();
    if(turno.status_id == 1){
      this.turnService.cambiarEstado({turn_id: turno._id, status_id: 2}).subscribe(res => {
        this.loadingService.ocultarCargando();
        this.mensajeService.agregarMensajeNotificacion({resumen:"estadoTurno", severidad: "success"});
        this.mostrarInfo = false;
      });
    }else if(turno.status_id == 2){
      this.turnService.cambiarEstado({turn_id: turno._id, status_id: 3}).subscribe(res => {
        this.loadingService.ocultarCargando();
        this.mensajeService.agregarMensajeNotificacion({resumen:"estadoTurno", severidad: "success"});
        this.mostrarInfo = false;  
      });
    }
  }

  obtenerTurnos(){
    this.events = [];
    this.turnService.getAllTurn().subscribe(res => {
      res.forEach(element => {
        let turno: any = {};
        turno._id = element._id;
        turno.code = element.code;
        turno.user_id = element.user_id;
        turno.end = element.end;
        turno.start = element.start;
        turno.status_id = element.status_id;
        if(turno.status_id == 1) turno.color = '#0183EF';
        if(turno.status_id == 2) turno.color = '#FF9400';
        if(turno.status_id == 3) turno.color = '#829F00';
        if(turno.status_id == 4) turno.color = '#A50400';
        this.events.push(turno);
      });
      }
    );
  }
}