import { Component, OnInit, ViewChild} from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin  from '@fullcalendar/timegrid';
import esLocale  from '@fullcalendar/core/locales/es';
import { AuthService } from 'src/app/service/autentication/auth.service';
import { userLogin } from 'src/app/models/userLogin';
import interactionPlugin from '@fullcalendar/interaction';
import {RolEnum} from '../../../enum/rol.enum';
import {TurnsService} from'src/app/service/turns.service';
import {createTurno}  from 'src/app/models/createTurno';
import { LoadingService } from 'src/app/service/loading.service';
import { MensajesService } from 'src/app/service/mensajes.service';
import { recibirTurno } from 'src/app/models/recibirTurno';

@Component({
  selector: 'app-carnetizate',
  templateUrl: './carnetizate.component.html',
  styleUrls: ['./carnetizate.component.scss']
})
export class CarnetizateComponent implements OnInit{
  
  @ViewChild('calendar') calendar:FullCalendarComponent | undefined;
  user: userLogin | null;
  mostrarInfo: boolean;
  mostrarDialogo: boolean;
  leyenda: string;
  role: RolEnum | null;
  infoFechaSeleccionada: Date = new Date();
  codigoDePago: string;
  timeQueue: number = 5;
  public events:recibirTurno [];


  constructor(private authService: AuthService, 
    private turnService: TurnsService,
    private mensajeService: MensajesService,
    private loader: LoadingService) {
    this.user = { id:'',firstName:'',lastName:'',email:'',role:-1,token:'', carnet: true };
    this.mostrarInfo =  false;
    this.mostrarDialogo = false; 
    this.leyenda = '';
    this.infoFechaSeleccionada = new Date();
    this.role = this.authService.getRol();
    this.codigoDePago = '';
    this.events = [];
    this.obtenerTurnos();
  }
  
  calendarOptions: CalendarOptions = {
    locale:esLocale,
    weekends: false,
    slotDuration:{minutes:this.timeQueue},
    slotLabelFormat: { hour: 'numeric', minute: '2-digit', omitZeroMinute: false, hour12: false, meridiem: 'short'},
    dayHeaderFormat: {weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true},
    allDaySlot:false,
    nowIndicator: true,
    firstDay: 1,
    validRange:{
      start: Date.now(),  
      end: '2022-11-31'
    },
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

ngOnInit(){
    this.user = this.authService.getDatosAutenticacion();
    this.motrarSeleccionarTurno();
    (this.user?.carnet)? this.timeQueue = 5 :this.timeQueue = 15;
    this.calendarOptions.slotDuration = {minutes: this.timeQueue};
    
    setTimeout(() => {
      this.calendarOptions.events = this.events;
    }, 1000);
    
    
  }

  motrarSeleccionarTurno():void{
    this.calendarOptions.dateClick = (info) => {
      let now = Date.now();  
      if(this.events.some(e => e.user_id == this.authService.getDatosAutenticacion()?.id)){
        this.mostrarDialogo = true;
        this.leyenda = "Tiene un turno en espera, no puede agendar otro."
      }else if(this.events.some(e => e.start == info.date.toISOString())){
        this.mostrarDialogo = true;
        this.leyenda = "El turno se encuentra ocupado, por favor, eleccione otro."
      }else if(info.date.valueOf() < now.valueOf()){
        this.mostrarDialogo = true;
        this.leyenda = "No puede seleccionar un turno de una fecha pasada."
      }else if(info.date.getHours() >= 12 && info.date.getHours() < 14){
        this.mostrarDialogo = true;
        this.leyenda = "Servicio no disponible entre las 12PM Y 2PM."
      }else {
        this.mostrarInfo = true;
        this.infoFechaSeleccionada = info.date;
      }  
    }
  }

  obtenerTurnos(){
    let turno: any = {};
    this.turnService.getAllTurn().subscribe((res:recibirTurno[]) => {
      res.forEach((element: recibirTurno) => {
        turno.end = element.end;
        turno.start = element.start;
        element.user_id == this.authService.getDatosAutenticacion()?.id ? 
        (turno.color = 'green', turno.title = 'Mi turno')
        : (turno.color = 'red', turno.title = 'No disponible'); 
        this.events.push(turno);
        // console.log(turno);
        this.events = [];
        console.log(this.events);
        // console.log(res);
      });
      }
    );
  }

  crearTurno(){
    this.loader.mostrarCargando();
    let turnSelected: createTurno = {queue_id:'',user_id:'',start: new Date, isPay: false};
    
    turnSelected.user_id = this.authService.getDatosAutenticacion()?.id;
    (this.user?.carnet)? turnSelected.queue_id = "6370298856bec1914d5c10e9": turnSelected.queue_id = "636ffae407758b383399bca1";
    /**
     * cola de primera vez: "636ffae407758b383399bca1"
     * cola de renovar: "370298856bec1914d5c10e9""
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