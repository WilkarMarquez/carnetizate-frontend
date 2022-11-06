import { Injectable } from "@angular/core";
import { Credentials } from "../../models/credentials";
import { userLogin } from "../../models/userLogin";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { LocalStorageService} from "./local-storage.service";

import { tap } from 'rxjs/operators';


@Injectable()

export class AuthService{
    urlSubject = new BehaviorSubject(false);
    private token: string = '';

    constructor (private httpClient: HttpClient, private localStorageService: LocalStorageService){}

    login(user: Credentials): Observable<userLogin>{
        return this.httpClient.post<userLogin>(environment.urlUsers+"signin", user);
    }

    logout(){
        
    }

    public getDatosAutenticacion():userLogin{
        return this.localStorageService.consultar("datosAutenticacion");
    }

    public borrarDatosAutenticacion(){
        this.localStorageService.remover('datosAutenticacion');
    }

    public setAutenticacion(user: userLogin){
        this.localStorageService.almacenar('datosAutenticacion', user);
    }
}