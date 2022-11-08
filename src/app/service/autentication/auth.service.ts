import { Injectable } from "@angular/core";
import { Credentials } from "../../models/credentials";
import { userLogin } from "../../models/userLogin";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { LocalStorageService} from "./local-storage.service";
import { RolEnum } from "src/app/enum/rol.enum";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private fuenteAutenticacion = new Subject<boolean>();
    cambioAutenticacion$ = this.fuenteAutenticacion.asObservable();

    constructor (
        private httpClient: HttpClient, 
        private localStorageService: LocalStorageService,
        private router:Router){}

    login(user: Credentials): Observable<userLogin>{
        return this.httpClient.post<userLogin>(environment.urlUsers+"signin", user);
    }

    logout(){
        this.borrarDatosAutenticacion();
        this.fuenteAutenticacion.next(false);
        this.router.navigate(['/']);
    }

    mostrarOpcion(rolPasado :RolEnum): boolean{
        return this.getRol() == rolPasado;
    }

    public getRol(): RolEnum |null{
        const role = this.getDatosAutenticacion()?.role;
        if(role){
            let rol:RolEnum;
            rol = role;
            return rol;
        }
        return null;
    }

    public getDatosAutenticacion():userLogin | null {
        return this.localStorageService.consultar("datosAutenticacion");
    }

    public borrarDatosAutenticacion(){
        this.localStorageService.remover('datosAutenticacion');
        this.localStorageService.remover('codigo');
    }
    
    public setAutenticacion(user: userLogin, cod:number){
        this.localStorageService.almacenarCodigo('codigo', cod);
        this.localStorageService.almacenar('datosAutenticacion', user);
        this.fuenteAutenticacion.next(true);
    }

    public getCodigo():number{
        return this.localStorageService.consultar('codigo');
    }
}