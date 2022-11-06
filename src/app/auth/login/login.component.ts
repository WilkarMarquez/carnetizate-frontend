import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/autentication/auth.service';
import { Credentials } from 'src/app/models/credentials'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userLogin } from 'src/app/models/userLogin';
import { MensajesService } from 'src/app/service/mensajes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  userCredential:Credentials;
  peticionEnviada: boolean;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private mensajeService: MensajesService
    ) { 
    this.userCredential = {username:0, password:''};
    this.peticionEnviada = false;
    this.formLogin = new FormGroup({
      username: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10) ]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)])
    });
  }

  ngOnInit(): void {
  }

  onLogin(): void{
    this.mensajeService.limpiarMensajes();
    this.peticionEnviada = true;
    this.userCredential.username = this.formLogin.value.username;
    this.userCredential.password = this.formLogin.value.password;
    this.authService.login(this.userCredential).subscribe(
      (res:userLogin) => {
          // this.router.navigateByUrl('/home');
          this.authService.setAutenticacion(res);
      },(res) => {
        const messError = res.error.message;
        if(messError == this.mensajeService.getMensajeAplicacion("codigoIncorrecto") || 
          messError == this.mensajeService.getMensajeAplicacion("contrasenaIncorrecta")){
          this.mensajeService.agregarMensajeNotificacion({resumen:"credencialeIncorrectas", severidad: "error"});
        }else{
          this.mensajeService.agregarMensajeNotificacion({resumen:"errorServidor", severidad: "error"});
        }
        this.peticionEnviada = false;
    });
  }

}
