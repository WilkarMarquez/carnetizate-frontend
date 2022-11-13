import { Component, OnInit } from '@angular/core';
import { userLogin } from 'src/app/models/userLogin';
import { AuthService } from 'src/app/service/autentication/auth.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  estudiante: userLogin | null[];
  codigo: number | null;

  constructor(private authService: AuthService){ 
    this.estudiante = { id:'',firstName:'',lastName:'',email:'',role:-1,token:'', carnet: false};
    this.codigo = 0; 
  }

  ngOnInit(){
    //this.estudiante = this.authService.getDatosAutenticacion();
    this.codigo = this.authService.getCodigo();
    this.cargaDeTurnos();
  }

  cargaDeTurnos(){

  }

}
