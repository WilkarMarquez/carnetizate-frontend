import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private muestraLoader: BehaviorSubject<boolean>;
  public muestraLoader$:Observable<boolean>;

  constructor(){
    this.muestraLoader = new BehaviorSubject<boolean>(false);
    this.muestraLoader$ = this.muestraLoader.pipe(
      switchMap(muestraLoader => {
        if(!muestraLoader) {
          return of(false);
        }
        return of(true).pipe(delay(400));
      })
    );
  }

  mostrarCargando(){
    this.muestraLoader.next(true);
  }

  ocultarCargando(){
    this.muestraLoader.next(false);
  }
}