import { Injectable } from "@angular/core";
import { UserI } from "../models/user";
import { JwtResponseI } from "../models/jwtResponseI";
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable()

export class AuthService{
    URL: string = environment.urlUsers;
    urlSubject = new BehaviorSubject(false);
    private token?: string | null;

    constructor (private httpClient: HttpClient){}
    
    login(user: UserI): Observable<JwtResponseI>{
        return this.httpClient.post<JwtResponseI>(`${this.URL}/signin`,
        user).pipe(tap(
            (res:JwtResponseI) => {
                if(res){
                    console.log(res);
                    this.saveToken(res.token);
                }
            }
        ))
    }

    logout(): void{
        this.token = '';
        localStorage.removeItem("TOKEN");
    }

    private saveToken (token: string): void{
        localStorage.setItem("TOKEN", token)
        this.token = token;
    }

    // private getToken(): string | null{
    //     if (!this.token) {
    //       this.token = localStorage.getItem("TOKEN");
    //     }
    //     return this.token;
    // }
}