import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajesComponent} from './components/mensajes/mensajes.component';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    MensajesComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
