import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createTurno } from '../models/createTurno';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TurnsService {

  constructor( private httpClient: HttpClient) {}
  

  createTurn(turno: createTurno):Observable<createTurno>{
    return this.httpClient.post<createTurno>(environment.urlTurns, turno);
  }

  getAllTurn():Observable<any>{
    return this.httpClient.get<any>(environment.urlTurns);
  }
}
