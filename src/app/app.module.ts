import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './authentication/auth.module';


import { AppComponent } from './app.component';

import { AuthenticationGuard } from './shared/guards/auth-guard.service';
import { CanDeactivateGuard } from './shared/guards/canDeactivate-guard.service';
import { RecipeResolver } from './shared/guards/recipe-resolver.service';

import { ReciepeService } from './recipes/services/recipe.service';
import { ShoppingListService } from './shopping-list/services/shopping-list.service';
import { BackendAppCommunicationService } from './shared/services/backend-app-communication.service';
import { AuthService } from './authentication/auth.service';
import { CanLoadGuard } from './shared/guards/canLoad-guard.service';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent   
  ],
  imports: [
    BrowserModule,      
    // RecipesModule,
    //ShoppingListModule,  //we are loding RecipesModule and ShoppingListModule via lazyLoading, so commenting this.
    AuthModule,
    CoreModule
  ],
  providers: [
    ReciepeService,
    ShoppingListService,
    AuthenticationGuard,
    CanLoadGuard,
    CanDeactivateGuard,    
    BackendAppCommunicationService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
