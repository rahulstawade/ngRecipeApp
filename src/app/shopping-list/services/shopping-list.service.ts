import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

    private shoppingList: Array<Ingredient> = [];
    public editShoppingListEvent = new Subject<number>();

    addIngradientToShoppingList(ingredientToAddInShoppingList: Ingredient) {
        this.shoppingList.push(ingredientToAddInShoppingList);
    }

    addAllIngradientsToShoppingList(recipeIngredients: Array<Ingredient>) {

        this.shoppingList.push(...recipeIngredients);
    }

    getShoppingList(): Array<Ingredient> {
        return this.shoppingList;
    }

    removeElementFormList(elementPositionToRemove: number) {
        if (this.shoppingList.length > 0) {
            this.shoppingList.splice(elementPositionToRemove, 1)
        }

    }

    getIngredientFromIndex(index : number) : Ingredient{
        return this.shoppingList[index];
    }

    updateInredientInShoppingList(index:number,ingredient : Ingredient){

        this.shoppingList[index] = ingredient;

    }


}