import { Injectable } from "@angular/core";
import { Credentials } from "../models/credentials";
import { userLogin } from "../models/userLogin";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, observable } from 'rxjs';
import { environment } from "src/environments/environment";

import { tap } from 'rxjs/operators';


@Injectable()

export class AuthService{
    URL: string = environment.urlUsers;
    urlSubject = new BehaviorSubject(false);
    private token: string = '';

    constructor (private httpClient: HttpClient){}

    login(user: Credentials): Observable<userLogin>{
        return this.httpClient.post<userLogin>(`${this.URL}/signin`,
        user)
    }
}