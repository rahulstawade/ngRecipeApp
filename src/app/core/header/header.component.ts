import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ReciepeService } from '../../recipes/services/recipe.service';
import { AuthService } from '../../authentication/auth.service';

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html'
})

export class HeaderComponent{

    constructor(private router:Router,
               private recipeService : ReciepeService,
               private authService : AuthService){}


    // onSelectRecipieSection(){
    //    this.router.navigate(['recipes']);
    // }

    // onSelectShoppingListSection(){
    //     this.router.navigate(['shoppingList']);

    // }

    onFetch(){
        console.log('Inside OnFetch  of Header Components...');
         this.recipeService.fetchAllStoredRecipiesFromBackendApp();
    }

    onSave(){
        console.log('Inside onSave  of Header Components...');
         this.recipeService.storeAllRecipiesUsingBackendApp();
    }

    isUserLoggedIn() : boolean{
        return this.authService.isUserLoggedIn();
    }

    onLogout(){
        this.authService.logoutUser();
        
    }

    onSampleTransform(){
        this.recipeService.sampleResponseObject_Transformation_ToCustomObjectType();
    }

    // @Output('sectionListner') sectionSelected = new EventEmitter<String>();

    // onSelectRecipieSection(){
    //     console.log('Recipie Selected....');
    //     this.sectionSelected.emit("Recipie");
    // }

    // onSelectShoppingListSection(){
    //     console.log('ShoppingList Selected.....');
    //     this.sectionSelected.emit("ShoppingList");
    // }
}