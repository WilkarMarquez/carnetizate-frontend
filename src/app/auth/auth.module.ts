import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from '../service/autentication/auth.service';
import { PrimengSharedModule } from '../shared/primeng-shared.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    HttpClientModule,
    AuthRoutingModule,
    PrimengSharedModule,
    ReactiveFormsModule
  ],
  providers:[AuthService]
})
export class AuthModule { }

