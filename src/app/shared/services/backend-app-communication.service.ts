import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';

import { Recipe } from 'src/app/recipes/recipe.model';
// import * as Rx from "rxjs/Rx";
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/authentication/auth.service';
import { RecipeTest } from 'src/app/recipes/recipeTest.model';



@Injectable()
export class BackendAppCommunicationService {

    constructor(private http: HttpClient,
        private authService: AuthService) { }


    saveAllRecipies(recipies: Recipe[]) : Observable<void> {

        let token = this.authService.getStoredToken();

        return this.http.put<void>('https://ng-recipe-app-project.firebaseio.com/recipes.json?auth='+token, recipies);

    }

    getNextIdForRecipies(){
        //to implement
    }

    fetchAllRecipiesFromBackEnd() : Observable<Recipe[]> {

      //let token =  this.authService.getStoredToken();

        // return this.http.get<Recipe[]>('https://ng-recipe-app-project.firebaseio.com/recipes.json?auth='+token)
   
        return this.http.get<Recipe[]>('https://ng-recipe-app-project.firebaseio.com/recipes.json')

        .pipe(
            map(
                (response: Recipe[]) => {                    

                    for (let recipe of response) {
                        if (!recipe['recipeIngredients']) {
                            recipe['recipeIngredients'] = [];
                        }
                    }
                    return response;
                }

            ),
            catchError(
                error => {
                    return throwError('SomeThing Went Wrog');
                }
            )
        );
    }

    fetchAllRecipiesFromBackEndAndTransformToOurObjectType() : Observable<RecipeTest[]> {  
     
          return this.http.get<Recipe[]>('https://ng-recipe-app-project.firebaseio.com/recipes.json')  
          .pipe(
              map(
                  (response: Recipe[]) => { 

                      let recipeTestArray : Array<RecipeTest> = [];

                      for (let recipe of response) {
                         let recipeTest = new RecipeTest();
                         recipeTest.name = recipe.name+'_Test';
                         recipeTest.description = recipe.description+'_Test';

                         recipeTestArray.push(recipeTest);
                      }
                      return recipeTestArray;
                  }
  
              ),
              tap(
                  convertedRecipeObject => {
                    console.log('This is the converted object in tap :');
                    console.log(convertedRecipeObject);
                  } 
              ),
              catchError(
                  error => {
                      return throwError('SomeThing Went Wrog');
                  }
              )
          );
      }
}