import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, defineFullCalendarElement, FullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale  from '@fullcalendar/core/locales/es';
import { AuthService } from 'src/app/service/autentication/auth.service';
import { userLogin } from 'src/app/models/userLogin';
import { RolEnum} from 'src/app/enum/rol.enum';

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
  codigo: number;
  constructor(private authService: AuthService) {
    this.user = { id:-1,firstName:'',lastName:'',email:'',role:-1,token:'' };
    this.codigo = 0;
  }

  ngOnInit(): void {
    this.user = this.authService.getDatosAutenticacion();
    this.codigo = this.authService.getCodigo();


  }
  
  condicionesEstudiantes(){
    
  }


  establecerEventoClick():void{
    this.calendarOptions.eventClick = () => {}
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
    plugins: [dayGridPlugin, timeGridPlugin],
    initialView: 'timeGridWeek',
    editable: true,
    slotMinTime: "08:00:00",
    slotMaxTime: "18:00:00",
    height: '90%'
  };
}