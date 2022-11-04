import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Credentials } from 'src/app/models/credentials'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: Credentials = {username: 0, password: ''};
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: any): void{
    this.user.username = form.value.username;
    this.user.password = form.value.password; 
    this.authService.login(this.user).subscribe(res => {
      // this.router.navigateByUrl('/');
      console.log("Token", res);
    },error => {
      console.log(error);
    });
  }

}
