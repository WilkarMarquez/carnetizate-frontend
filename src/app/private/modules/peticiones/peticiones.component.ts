import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin  from '@fullcalendar/timegrid';
import esLocale  from '@fullcalendar/core/locales/es';
import { AuthService } from 'src/app/service/autentication/auth.service';
import { userLogin } from 'src/app/models/userLogin';
import interactionPlugin from '@fullcalendar/interaction';
import { TurnsService } from 'src/app/service/turns.service';
import { recibirTurno } from 'src/app/models/recibirTurno';


@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.scss']
})
export class PeticionesComponent implements OnInit {

  calendarOptions: CalendarOptions = Object.assign({},FullcalendarC.optionsCalendar);
  @ViewChild('peticiones') peticiones:FullCalendarComponent | undefined;
  user: userLogin | null;
  mostrarInfo: boolean;
  infoFechaSeleccionada: {};
  events: recibirTurno[] = [];
  turnoSeleccionado: any;

  constructor(private authService: AuthService, private turnService: TurnsService) {
    this.user = { id:'',firstName:'',lastName:'',email:'',role:-1,token:'', carnet: false };
    this.mostrarInfo =  false;
    this.infoFechaSeleccionada = Date();
    this.obtenerTurnos();
    this.turnoSeleccionado = {};
  }

  ngOnInit(): void {
    this.user = this.authService.getDatosAutenticacion();
    this.motrarInformacionTurno();

    setTimeout(() => {
      this.peticiones?.getApi().render();
      this.calendarOptions.events = this.events;
    }, 1000);

  }

  motrarInformacionTurno():void{
    this.calendarOptions.eventClick = (info) => {
      this.turnoSeleccionado = info.event.extendedProps
      this.mostrarInfo = true;
    }
  }

  obtenerTurnos(){
    let turno: any = {};
    this.events = [];
    this.turnService.getAllTurn().subscribe(res => {
      res.forEach(element => {
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
