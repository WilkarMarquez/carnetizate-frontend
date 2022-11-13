import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, defineFullCalendarElement, FullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale  from '@fullcalendar/core/locales/es';
import { AuthService } from 'src/app/service/autentication/auth.service';
import { userLogin } from 'src/app/models/userLogin';
import interactionPlugin from '@fullcalendar/interaction';
import {RolEnum} from '../../../enum/rol.enum';
import {TurnsService} from'src/app/service/turns.service';
import {createTurno}  from 'src/app/models/createTurno';
import { LoadingService } from 'src/app/service/loading.service';
import { MensajesService } from 'src/app/service/mensajes.service';

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
  role: RolEnum | null;
  infoFechaSeleccionada: Date = new Date();
  codigoDePago: string;

  constructor(private authService: AuthService, 
    private turnService: TurnsService,
    private mensajeService: MensajesService,
    private loader: LoadingService,) {
    this.user = { id:'',firstName:'',lastName:'',email:'',role:-1,token:'', carnet: true };
    this.mostrarInfo =  false;
    this.infoFechaSeleccionada = new Date();
    this.role = this.authService.getRol();
    this.codigoDePago = '';
  }

  ngOnInit(): void {
    this.user = this.authService.getDatosAutenticacion();
    this.motrarSeleccionarTurno();
  }

  motrarSeleccionarTurno():void{
    this.calendarOptions.dateClick = (info) => {
      this.mostrarInfo = true;
      this.infoFechaSeleccionada = info.date;
    }
  }

  crearTurno(){
    this.loader.mostrarCargando();
    let turnSelected: createTurno = {queue_id:'',user_id:'',start: new Date, isPay: false};
    
    turnSelected.user_id = this.authService.getDatosAutenticacion()?.id;
    this.user?.carnet ? turnSelected.queue_id = "636ff9a41ba899c82e4ac458": turnSelected.queue_id = "636ffae407758b383399bca1";
    /**
     * cola de primera vez: "636ffae407758b383399bca1"
     * cola de renovar: "636ff9a41ba899c82e4ac458"
     */
    turnSelected.start = this.infoFechaSeleccionada;
    if(this.user?.carnet){
      turnSelected.code = this.codigoDePago;
    }

    this.turnService.createTurn(turnSelected).subscribe(
      (res)=>{
        this.mostrarInfo = false;
        this.loader.ocultarCargando();
        this.mensajeService.agregarMensajeNotificacion({resumen:"turnoAgendado", severidad: "success"});
      },
      (err) => {
        this.mostrarInfo = false;
        this.loader.ocultarCargando();
        this.mensajeService.agregarMensajeNotificacion({resumen:"turnoNoAgendado", severidad:"error"});
      }
    );
  }

}
  
export class FullcalendarConfig {

  public static options: CalendarOptions = {
    locale:esLocale,
    weekends: false,
    slotDuration:{minutes:15},
    slotLabelFormat: { hour: 'numeric', minute: '2-digit', omitZeroMinute: false, hour12: false, meridiem: 'short'},
    dayHeaderFormat: {weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true},
    allDaySlot:false,
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