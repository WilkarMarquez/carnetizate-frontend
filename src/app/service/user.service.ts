import { Injectable } from '@angular/core';
import { userLogin } from "src/app/models/userLogin";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient:HttpClient) { }

  obtenerUsuarios(user_id? :string):Observable<userLogin[]>{
    typeof user_id == undefined? user_id = '': user_id = user_id;
    return this.httpClient.post<userLogin[]>(environment.urlUsers+'all', user_id);
  }
}
