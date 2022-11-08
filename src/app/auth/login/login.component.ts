import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/autentication/auth.service';
import { Credentials } from 'src/app/models/credentials'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userLogin } from 'src/app/models/userLogin';
import { MensajesService } from 'src/app/service/mensajes.service';
import { LoadingService } from 'src/app/service/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formLogin: FormGroup;
  userCredential:Credentials;
  peticionEnviada: boolean;
  usuarioSubscription = new Subscription();
  url:string;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private mensajeService: MensajesService,
    private loader: LoadingService,
    private route: ActivatedRoute
    ) { 
    this.userCredential = {username:0, password:''};
    this.peticionEnviada = false;
    this.url = '/user';
    this.formLogin = new FormGroup({
      username: new FormControl(undefined, [Validators.required, Validators.minLength(10), Validators.maxLength(10) ]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)])
    });
  }

  ngOnInit(): void {
    const datosAutenticacion = this.authService.getDatosAutenticacion();
    const token = datosAutenticacion? datosAutenticacion.token : '';
    if(token !== ''){
      this.router.navigate([this.url]);
    }else{
      this.authService.borrarDatosAutenticacion();
    }
    //this.url = this.route.snapshot.queryParams['returnUrl'] || '/autorizado/inicio';
    this.url = this.route.snapshot.queryParams['url'] || 'user';
  }

  ngOnDestroy(): void {
    this.usuarioSubscription.unsubscribe();
  }

  onLogin(): void{
    this.mensajeService.limpiarMensajes();
    this.loader.mostrarCargando();
    this.peticionEnviada = true;
    this.userCredential.username = this.formLogin.value.username;
    this.userCredential.password = this.formLogin.value.password;
    this.authService.login(this.userCredential).subscribe(
      (res:userLogin) => {
          this.loader.ocultarCargando();
          this.router.navigate([this.url]);
          this.authService.setAutenticacion(res, this.userCredential.username);
      },(res) => {
        this.loader.ocultarCargando();
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
