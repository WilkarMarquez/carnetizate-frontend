import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, defineFullCalendarElement, FullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale  from '@fullcalendar/core/locales/es';
import { AuthService } from 'src/app/service/autentication/auth.service';
import { userLogin } from 'src/app/models/userLogin';
import interactionPlugin from '@fullcalendar/interaction';

defineFullCalendarElement();

@Component({
  selector: 'app-carnetizate',
  templateUrl: './carnetizate.component.html',
  styleUrls: ['./carnetizate.component.scss']
})
export class CarnetizateComponent implements OnInit {

  calendarOptions: CalendarOptions = Object.assign({},FullcalendarConfig.options);
  @ViewChild('calendar') calendar:FullCalendarElement | undefined;
  user: userLogin | null;
  mostrarInfo: boolean;
  infoFechaSeleccionada: {};

  constructor(private authService: AuthService) {
    this.user = { id:-1,firstName:'',lastName:'',email:'',role:-1,token:'' };
    this.mostrarInfo =  false;
    this.infoFechaSeleccionada = Date();
  }

  ngOnInit(): void {
    this.user = this.authService.getDatosAutenticacion();
    this.motrarSeleccionarTurno();
    this.calendarOptions.events = [
      {
        title: "Evento 1",
        start: new Date().getTime(),
        description: "evento 1"
      },
      {
        title: "Evento 2",
        start: new Date(new Date().getTime() + 86400000),
        description: "evento 2"
      },
      {
        title: "Evento 3",
        start: new Date(new Date().getTime() + (86400000 * 2)),
        end: new Date(new Date().getTime() + (86400000 * 3)),
        description: "evento 2"
      },
    ]
  }

  motrarSeleccionarTurno():void{
    this.calendarOptions.dateClick = (info) => {
      this.mostrarInfo = true;
      this.infoFechaSeleccionada = info.date.getDay;
      
    }
  }

}
  
export class FullcalendarConfig {

  public static options: CalendarOptions = {
    locale:esLocale,
    weekends: false,
    slotDuration:{minutes:15},
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
    height: '90%'
  };
}