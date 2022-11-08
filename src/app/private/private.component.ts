import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/autentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {


  constructor(private router: Router, private authService: AuthService) { }
  
  ngOnInit(): void {
    // const token = this.authService.getDatosAutenticacion()?.token;
    // if(token != '' || token != undefined || token != null){
    //   this.router.navigate(["/"]);
    // }
  }

}
