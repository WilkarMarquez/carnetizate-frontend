import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createTurno } from '../models/createTurno';
import { environment } from 'src/environments/environment';
import { recibirTurno } from '../models/recibirTurno';
import { cambiarEstado } from '../models/cambiarEstado';


@Injectable({
  providedIn: 'root'
})

export class TurnsService {

  constructor( private httpClient: HttpClient) {}
  
  createTurn(turno: createTurno):Observable<createTurno>{
    return this.httpClient.post<createTurno>(environment.urlTurns, turno);
  }

  getAllTurn():Observable<recibirTurno[]>{
    return this.httpClient.get<recibirTurno[]>(environment.urlTurns);
  }
    
  cambiarEstado(turno: cambiarEstado):Observable<cambiarEstado>{
    return this.httpClient.put<any>(environment.urlTurns, turno);
  }
}
