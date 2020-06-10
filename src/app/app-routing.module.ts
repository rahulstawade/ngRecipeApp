import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AuthenticationGuard } from './shared/guards/auth-guard.service';
import { CanLoadGuard } from './shared/guards/canLoad-guard.service';




const routes: Routes = [

  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) }, //Lazy Loading Angular in 9 

  //{ path: 'shoppingList', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' }, // Lazy Lodaing angular in 4

  //canLoad wont even allow loadingComponents inside WEBPACK if : the canLoad() methods condition is false inside CanLodGuard

  /*  {
     path: 'shoppingList', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule),
     canLoad: [CanLoadGuard] 
   },
  */

  //Also : once the canLoad() condition is true the components will be loaded inside Webpack so we are also adding canActivateRoute  

  {
    path: 'shoppingList', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule),
    canLoad: [AuthenticationGuard], canActivate: [AuthenticationGuard]
  },

  { path: 'not-found', component: PageNotFoundComponent, data: { message: 'Page Not Found!' } },
  { path: '**', redirectTo: '/not-found' }

];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],

  // PreloadingStrategy will pre load all the lazily loaded modules when it has time to do so 
  // ie; when user is using other areas (so that once user click on a lazily loaded module, it loades faster than it would take to load
  // while lazily loading the modules without a preload stratergy)

  imports :[RouterModule.forRoot(routes,{preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}