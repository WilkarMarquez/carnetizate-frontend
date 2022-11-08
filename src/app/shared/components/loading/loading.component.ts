import { Component, OnDestroy} from '@angular/core';
import { LoadingService } from 'src/app/service/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnDestroy {

  mostrarCargando: boolean;
  cursosSubscription = new Subscription();

  constructor(public loaderService: LoadingService) {
    this.mostrarCargando = false;

    this.cursosSubscription = this.loaderService.muestraLoader$.subscribe((estado:boolean) => {
      this.mostrarCargando = estado;
    });
  }

  ngOnDestroy(): void {
    this.cursosSubscription.unsubscribe();
  }

}
