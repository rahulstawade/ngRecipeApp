import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { BackendAppCommunicationService } from 'src/app/shared/services/backend-app-communication.service';
import { Recipe } from '../recipe.model';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { RecipeTest } from '../recipeTest.model';

@Injectable()
export class ReciepeService {

    recipiesList: Array<Recipe> = new Array();

    setRecipiesList(recipiesListToSet: Recipe[]) {
        this.recipiesList = recipiesListToSet;
    }

    recipeListChanged = new Subject<Recipe[]>();



    // @Output() recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();


    constructor(private authService: AuthService, private backEndService: BackendAppCommunicationService) {
        this.initializeReciepeList();
    }


    generateRecipeId(): number {

        if (this.recipiesList.length > 0) {
            let idOfLastInsertedRecipe = this.recipiesList[this.recipiesList.length - 1].id;
            return idOfLastInsertedRecipe + 1;
        } else {
            return 1;
        }




    }

    initializeReciepeList() {

        this.recipiesList.push(
            new Recipe().constructRecipe(this.generateRecipeId(), 'Chicken Chilli',
                'test Description',
                'nonveg',
                'https://c1.wallpaperflare.com/preview/379/923/804/daljjim-chicken-dishes-food-chicken-food-photography-cooking.jpg',
                [new Ingredient('Green Chillies', 6), new Ingredient('Chicken', 8), new Ingredient('Onion', 2)])
        );

        this.recipiesList.push(
            new Recipe().constructRecipe(this.generateRecipeId(), 'Chiken Biryani',
                'description on receipe 2',
                'veg',
                'assets/ImagesForRecipies/1.jpg',
                [new Ingredient('Rice', 1), new Ingredient('Chicken Legpiece', 4), new Ingredient('Herbs', 2), new Ingredient('Chilly Powder', 1)])
        );

        this.recipiesList.push(new Recipe().constructRecipe(this.generateRecipeId(), 'Chiken Pizza',
            'description on receipe 3',
            'veg',
            'assets/ImagesForRecipies/3.jpg',
            [new Ingredient('Tomato', 2), new Ingredient('Boiled Chicken', 2), new Ingredient('Onion', 2), new Ingredient('Capsicum', 2), new Ingredient('Bread Base', 1)])
        );

        this.recipiesList.push(new Recipe().constructRecipe(this.generateRecipeId(), 'Prawns fry',
            'description on receipe 4',
            'nonveg',
            'assets/ImagesForRecipies/2.jpg',
            [new Ingredient('Oil', 1), new Ingredient('Prawns', 12), new Ingredient('Salt', 2), new Ingredient('Chilly Powder', 1), new Ingredient('Ginger Garlic Past', 1)])
        );

    }


    addNewRecipeToList(recipeToAdd: Recipe): number {
        recipeToAdd.id = this.generateRecipeId();
        this.recipiesList.push(recipeToAdd);
        return recipeToAdd.id;
    }

    removeRecipeFromList(recipeToRemove: Recipe) {

        let indexPositionOfRecipe = this.getPositionOfRecipeInList(recipeToRemove.id);
        if (indexPositionOfRecipe > -1) {
            this.recipiesList.splice(indexPositionOfRecipe, 1);
        } else {
            console.log('recipe with id :' + recipeToRemove.id + ' is not present in the Recipe List');
        }

    }

    getPositionOfRecipeInList(recipeId: number): number {
        let position: number;
        for (position = 0; position < this.recipiesList.length; position++) {
            if (this.recipiesList[position].id === recipeId) {
                return position;
            }
        }
        return -1;

    }


    getRecipeById(recipeId: number) {
        return this.recipiesList.find(
            (recipe) => {
                return recipe.id === recipeId;
            }
        );
        ;
    }

    canEditRecipe(recipeId: number): boolean {
        let recipe: Recipe = this.getRecipeById(recipeId);
        console.log('InService : isLogin - ' + this.authService.isUserLoggedIn());
        return (this.authService.isUserLoggedIn() && recipe.id != 1);
    }

    editRecipe(recipeToEdit: Recipe) {

        let recipe = this.getRecipeById(recipeToEdit.id);

        recipe.name = recipeToEdit.name;
        recipe.description = recipeToEdit.description;
        recipe.type = recipeToEdit.type;
        recipe.imagePath = recipeToEdit.imagePath;
        recipe.recipeIngredients = recipeToEdit.recipeIngredients;
    }

    storeAllRecipiesUsingBackendApp() {

        this.backEndService.saveAllRecipies(this.recipiesList)
        .subscribe(
            (response : void) => {
                console.log('Saved Recipe Response : - ' + JSON.stringify(response));
            },
            (error : void) => {
                console.log(error);
                alert(error['error']);
            },
            () => {
                alert('Recipies Succesfully Saved!');
            }
        );

    }

    fetchAllStoredRecipiesFromBackendApp() {

        this.backEndService.fetchAllRecipiesFromBackEnd()
        .subscribe(
            (recipesData : Recipe[]) => {
                this.setRecipiesList(recipesData);
                this.recipeListChanged.next(this.recipiesList);
            },
            (error) => {
                alert(error);
            },
            () => {
                alert('Recipies Successfully Fetched!');
            }            
        );


    }

    sampleResponseObject_Transformation_ToCustomObjectType(){
        this.backEndService.fetchAllRecipiesFromBackEndAndTransformToOurObjectType()
        .subscribe(
            (recipeTestArray : RecipeTest[]) => {
                console.log('Transformed Object Array :');
                for(let recipeTest of recipeTestArray){
                    console.log(recipeTest);
                }
            },
            (error) => console.log(error) ,
            () => {
                console.log('ResposeObject Transformation to Custom Object Complete..')
            }
        );
    }


}