import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { MensajesComponent} from './components/mensajes/mensajes.component';


@NgModule({
  declarations: [MensajesComponent],
  imports: [
    CommonModule,
    TooltipModule
  ]
})
export class SharedModule { }
