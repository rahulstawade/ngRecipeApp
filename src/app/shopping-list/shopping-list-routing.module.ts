import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { AuthenticationGuard } from '../shared/guards/auth-guard.service';


const shoppingListRoutes : Routes = [

    //{ path: '', component: ShoppingListComponent, canActivate: [AuthenticationGuard] },
    //removed canActivate Guard parameter because we have added it inside app-routing.module while lazy loading
    { path: '', component: ShoppingListComponent}

];

@NgModule({
    
    imports : [RouterModule.forChild(shoppingListRoutes)],
    exports : [RouterModule]
})
export class ShoppingListRoutingModule{}