import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export class CanDeactivateGuard implements CanDeactivate<CanDeactivateComponent> {

    canDeactivate(component: CanDeactivateComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate();
    }




}

export interface CanDeactivateComponent {
    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}