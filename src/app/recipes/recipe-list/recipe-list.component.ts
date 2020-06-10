import { Component, OnInit, EventEmitter, Output, HostListener } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ReciepeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {


  // @Output() recipeItemSelected = new EventEmitter<Recipe>();
  recipiesList: Array<Recipe>;

  fliterValue: string = '';
  // filterPropertyValue : string ='';

  // setFilterPropertyValue(propertyName :  string){
  //   this.filterPropertyValue = propertyName;
  // }

  constructor(private recipeService: ReciepeService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {

    this.fetchRecipesList();

    this.recipeService.recipeListChanged.subscribe(
      (newRecipeList: Recipe[]) => {
        this.recipiesList = newRecipeList;
      }
    );


  }


  fetchRecipesList() {
    this.recipiesList = this.recipeService.recipiesList;
  }

  // sendRecipe(receipe : Recipe){
  //   this.recipeService.recipeSelected.emit(receipe);
  // }


  // recipiesList: Recipe[] = [
  //   new Recipe('Chicken Chilli', 'test Description',
  //     'https://c1.wallpaperflare.com/preview/379/923/804/daljjim-chicken-dishes-food-chicken-food-photography-cooking.jpg'),
  //   new Recipe('Chiken Biryani', 'description on receipe 2', 'assets/ImagesForRecipies/1.jpg'),
  //   new Recipe('Chiken Pizza', 'description on receipe 3', 'assets/ImagesForRecipies/3.jpg'),
  //   new Recipe('Praws fry', 'description on receipe 4', 'assets/ImagesForRecipies/2.jpg')
  // ];

  // onRecipeSelect(selectedRecipe : Recipe){
  //   this.recipeItemSelected.emit(selectedRecipe);
  // }






}
