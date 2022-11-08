import { Component, OnInit, Input, Output } from '@angular/core';
import { MenuUsuarioService } from 'src/app/service/menu.service';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  itemsHabilitados:MenuItem[];
  

  constructor(private menuService: MenuUsuarioService, private router: Router) { 
    this.itemsHabilitados = [];
  }

  ngOnInit(): void {
    this.menuService.setItems();
    for(let menuItem of this.menuService.getItems()){
      if(menuItem.visible){
        this.itemsHabilitados.push(menuItem);
      }
    }
  }
  
  verOpcion(url:string[]){
    this.router.navigate(url);
  }
}
