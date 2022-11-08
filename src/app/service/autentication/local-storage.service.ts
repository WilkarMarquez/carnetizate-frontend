import { Injectable } from '@angular/core';
import { userLogin } from 'src/app/models/userLogin';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorage: Storage;

  constructor() { 
    this.localStorage = localStorage;
  }

  public almacenar(key: string, valor: userLogin){
    this.localStorage.setItem(key, JSON.stringify(valor));
  }

  public almacenarCodigo(key: string, valor: number){
    this.localStorage.setItem(key, JSON.stringify(valor))
  }

  public consultar(key: string): any {
    const item = this.localStorage.getItem(key);

    if (item && item !== 'undefined') {
      return JSON.parse(item);
    }

    return;
  }

  public remover(key: string) {
    this.localStorage.removeItem(key);
  }

}
