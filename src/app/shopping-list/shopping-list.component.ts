import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[] = this.shoppingListService.getShoppingList();

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
  }

  onIngredientAdd(ingredient : {name:string,amount:number}){

    let ingredientObj : Ingredient = new Ingredient(ingredient.name,ingredient.amount);
    this.shoppingListService.addIngradientToShoppingList(ingredientObj);
    //this.ingredients.push(ingredientObj);
  }

  onDeleteIngredient(ingredientIdToRemove : number ){
    this.shoppingListService.removeElementFormList(ingredientIdToRemove);
  }

  onIngredientSelect(index : number){
    this.shoppingListService.editShoppingListEvent.next(index);
  }

}
