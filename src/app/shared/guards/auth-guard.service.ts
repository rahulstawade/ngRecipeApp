import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild,CanLoad {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

         if(this.authService.isUserLoggedIn()){
            return true;
        }else{
            alert('Please Login to Proceed');
            this.router.navigate(['/signin']); 
            return false;
        }        
   
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);

    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {

        console.log('Path received in CanLoad of AuthenticationGuard: '+route.path);
        if(this.authService.isUserLoggedIn()){
            return true;
        }else{
            alert('Please Login to Proceed');
            this.router.navigate(['/signin']); 
        }     
    
    }
}