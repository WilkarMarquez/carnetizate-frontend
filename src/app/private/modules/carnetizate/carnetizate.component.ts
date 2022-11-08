import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-carnetizate',
  templateUrl: './carnetizate.component.html',
  styleUrls: ['./carnetizate.component.scss']
})
export class CarnetizateComponent implements OnInit {

  constructor() { }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    }
  };

  ngOnInit(): void {
  }

}
