import { Injectable } from '@angular/core';
import { RolEnum } from '../enum/rol.enum';
import { MenuItem } from 'primeng/api';
import { AuthService } from './autentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuUsuarioService {
  items: MenuItem[];

  constructor(private seguridadService:AuthService) {
    this.items = [];
  }

  setItems(){
    this.items = [
      {
        label:'Inicio',
        routerLink: ["/user/home"],
        icon:'fas fa-home icono',
        visible: this.seguridadService.mostrarOpcion(RolEnum.Estudiante) 
                  || this.seguridadService.mostrarOpcion(RolEnum.Auxiliar)
      },
      {
        label:'Carnetizate',
        routerLink: ["/user/carnetizate"],
        icon:'fas fa-solid fa-id-card icono',
        visible: this.seguridadService.mostrarOpcion(RolEnum.Estudiante)
      },
      {
        label:'Informacion',
        routerLink: ["/user/informacion"],
        visible: this.seguridadService.mostrarOpcion(RolEnum.Estudiante),
        icon: 'fas fa-solid fa-info icono'
      },
      {
        label:'Peticiones',
        routerLink: ["/user/peticiones"],
        visible: this.seguridadService.mostrarOpcion(RolEnum.Auxiliar),
        icon: 'fas fa-solid fa-id-card icono'
      },
      {
        label:'Buscar',
        routerLink: ["/user/buscar"],
        visible: this.seguridadService.mostrarOpcion(RolEnum.Auxiliar),
        icon: 'fas fa-solid fa-list icono'
      },
      {
        label:'Informes',
        routerLink: ["/user/informes"],
        visible: this.seguridadService.mostrarOpcion(RolEnum.Auxiliar),
        icon: 'fas fa-solid fa-chart-line icono'
      }
    ];
  }

  getItems(){
    return this.items;
  }
}
