import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Observable } from 'rxjs';
import { ReciepeService } from 'src/app/recipes/services/recipe.service';
import { Injectable } from '@angular/core';


@Injectable()
export class RecipeResolver implements Resolve<Recipe> {

    constructor(private recipeService: ReciepeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe | Observable<Recipe> | Promise<Recipe> {

        return this.recipeService.getRecipeById(+route.params['id']);
       
    }



}