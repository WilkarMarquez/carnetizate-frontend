import { Component, OnInit } from '@angular/core';
import { TurnsService } from 'src/app/service/turns.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

  constructor(private turnService: TurnsService) { }

  ngOnInit(): void {
    
  }

}
