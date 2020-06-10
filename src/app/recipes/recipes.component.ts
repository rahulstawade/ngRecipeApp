import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  // selectedRecipeForDescription : Recipe;

  constructor() { 
    console.log('Inside recipes Components constructor...')
  }

  ngOnInit(): void {
    console.log('Inside recipes Components onInit...')
    
  }

  // onReceipeItemSelect(selectedRecipeItem :  Recipe){
  //   this.selectedRecipeForDescription =  selectedRecipeItem;
  // }

}
