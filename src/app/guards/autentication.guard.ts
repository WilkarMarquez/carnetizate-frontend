import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../service/autentication/auth.service';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticationGuard implements CanActivate {

  constructor( private authService: AuthService, private router: Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const dataAutentication = this.authService.getDatosAutenticacion();
    const token = dataAutentication? dataAutentication.token: '';
    
    if (token !== ''){
      return true;
    }

    this.router.navigate(['/'], { queryParams: { url: state.url }});
    return false;
  }
  
}
