import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, defineFullCalendarElement, FullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale  from '@fullcalendar/core/locales/es';
import { AuthService } from 'src/app/service/autentication/auth.service';
import { userLogin } from 'src/app/models/userLogin';
import interactionPlugin from '@fullcalendar/interaction';

// defineFullCalendarElement(peticiones);

@Component({
  selector: 'app-peticiones',
  templateUrl: './peticiones.component.html',
  styleUrls: ['./peticiones.component.scss']
})
export class PeticionesComponent implements OnInit {

  calendarOptions: CalendarOptions = Object.assign({},FullcalendarC.optionsCalendar);
  @ViewChild('peticiones') peticiones:FullCalendarElement | undefined;
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
  }

  motrarSeleccionarTurno():void{
    this.calendarOptions.dateClick = (info) => {
      this.mostrarInfo = true;
      this.infoFechaSeleccionada = info.date.getDay;
      
    }
  }

}
  
export class FullcalendarC {

  public static optionsCalendar: CalendarOptions = {
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
