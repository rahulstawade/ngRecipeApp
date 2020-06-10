import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { AuthenticationGuard } from './auth-guard.service';


@Injectable()
export class CanLoadGuard implements CanLoad {

    constructor(private authService: AuthService, private router: Router) { }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {

        console.log('Path received in CanLoad : ' + route.path);
        if (this.authService.isUserLoggedIn()) {
            return true;
        } else {
            alert('Please Login to Proceed');
            this.router.navigate(['/signin']);
            return false;
        }

    }


}