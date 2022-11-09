import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { HomeComponent } from './modules/home/home.component';
import { CarnetizateComponent } from './modules/carnetizate/carnetizate.component';
import { InformacionComponent } from './modules/informacion/informacion.component';
import { BuscarComponent } from './modules/buscar/buscar.component';
import { EstadisticasComponent } from './modules/estadisticas/estadisticas.component';
import { PeticionesComponent } from './modules/peticiones/peticiones.component';

const routes: Routes = [{ path: '', component: PrivateComponent, children: [
        {path: 'home', component: HomeComponent},
        {path: 'carnetizate', component: CarnetizateComponent},
        {path: 'informacion', component: InformacionComponent},
        {path: 'buscar', component: BuscarComponent},
        {path: 'informes', component: EstadisticasComponent},
        {path: 'peticiones', component: PeticionesComponent},
        {path: '', component: HomeComponent}
      ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }