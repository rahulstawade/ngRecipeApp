import { Ingredient } from '../shared/ingredient.model';
import { OnInit } from '@angular/core';

export class Recipe {
  public id: number;
  public name: string;
  public description: string;
  public type: string;
  public imagePath: string;

  public recipeIngredients: Array<Ingredient>;

  constructor(){}

  constructRecipe(id: number, name: string, descp: string, type: string, imagePath: string, ingredients: Array<Ingredient>) : Recipe{
    this.id = id;
    this.name = name;
    this.description = descp;
    this.type = type;
    this.imagePath = imagePath;
    this.recipeIngredients = ingredients;

    return this;
  }


}