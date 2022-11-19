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


@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.scss']
})
export class PeticionesComponent implements OnInit {

  calendarOptions: CalendarOptions = Object.assign({},FullcalendarC.optionsCalendar);
  @ViewChild('peticiones') peticiones:FullCalendarComponent | undefined;
  mostrarInfo: boolean;
  infoFechaSeleccionada: {};
  events: recibirTurno[] = [];
  turnoSeleccionado: any;

  constructor(private loadingService: LoadingService ,private turnService: TurnsService, private userService: UserService) {
    this.mostrarInfo =  false;
    this.infoFechaSeleccionada = Date();
    this.turnoSeleccionado = {};
    this.loadingService.mostrarCargando();
    this.obtenerTurnos();
  }

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

  cambiarEstado(){
    
  }

  obtenerTurnos(){
    this.events = [];
    this.turnService.getAllTurn().subscribe(res => {
      res.forEach(element => {
        let turno: any = {};
        turno.id = element._id;
        turno.code = element.code;
        turno.user_id = element.user_id;
        turno.end = element.end;
        turno.start = element.start;
        turno.status_id = element.status_id;
        if(turno.status_id == 1) {turno.color = '#0183EF'};
        if(turno.status_id == 2) {turno.color = '#FF9400'};
        if(turno.status_id == 3) {turno.color = '#829F00'};
        if(turno.status_id == 4) {turno.color = '#A50400'};
        this.events.push(turno);
      });
      this.events = res;
      }
    );
  }
}
  
export class FullcalendarC {

  public static optionsCalendar: CalendarOptions = {
    locale:esLocale,
    weekends: false,
    slotDuration:{minutes:5},
    allDaySlot: false,
    slotLabelFormat: { hour: 'numeric', minute: '2-digit', omitZeroMinute: false, hour12: false, meridiem: 'short'},
    dayHeaderFormat: {weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true},
    nowIndicator: true,
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
}