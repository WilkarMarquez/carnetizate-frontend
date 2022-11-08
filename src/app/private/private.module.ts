import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PrivateComponent } from './private.component';
import { MenuComponent } from './components/menu/menu.component';
import { PrivateRoutingModule } from './private-routing.module';
import { PrimengSharedModule } from '../shared/primeng-shared.module';
import { HomeComponent } from './modules/home/home.component';
import { CarnetizateComponent } from './modules/carnetizate/carnetizate.component';
import { InformacionComponent } from './modules/informacion/informacion.component';
import { BuscarComponent } from './modules/buscar/buscar.component';
import { EstadisticasComponent } from './modules/estadisticas/estadisticas.component';


@NgModule({
  declarations: [
    HeaderComponent,
    PrivateComponent,
    MenuComponent,
    HomeComponent,
    CarnetizateComponent,
    InformacionComponent,
    BuscarComponent,
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    PrimengSharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class PrivateModule { }
