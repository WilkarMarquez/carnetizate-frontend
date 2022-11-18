import { Injectable } from '@angular/core';
import { userLogin } from "src/app/models/userLogin";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient:HttpClient) { }

  obtenerUsuario(user: string):Observable<userLogin[]>{
    return this.httpClient.get<userLogin[]>(environment.urlUsers);
  }

}
