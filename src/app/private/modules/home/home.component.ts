import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/autentication/auth.service';
import { userLogin } from 'src/app/models/userLogin';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: userLogin | null;
  codigo: number;
  constructor(private authService: AuthService) {
    this.user = { id:'',firstName:'',lastName:'',email:'',role:-1,token:'', carnet: false };
    this.codigo = 0;
  }

  ngOnInit(): void {
    this.user = this.authService.getDatosAutenticacion();
    this.codigo = this.authService.getCodigo();
  }

}
