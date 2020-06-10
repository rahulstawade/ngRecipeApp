import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ReciepeService } from '../services/recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { ActivatedRoute, Params, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  // @Input() selectedRecipe: Recipe;
  selectedRecipe: Recipe;
  paramsSubscription: Subscription;
  //resolveSubscription: Subscription;
  // showBackOption: boolean = false;

  constructor(private recipeService: ReciepeService,
    private shoppingListService: ShoppingListService,
    private authService : AuthService,
    private route: ActivatedRoute,
    private router: Router) {}


  ngOnInit(): void {


    // this.recipeService.recipeSelected.subscribe(
    //   (recipe: Recipe) => {
    //     this.selectedRecipe = recipe;
    //   }
    // );

     this.selectedRecipe = this.recipeService.getRecipeById(+this.route.snapshot.params['id']);


    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.selectedRecipe = this.recipeService.getRecipeById(+params['id']);
      }
    );

    this.recipeService.recipeListChanged.subscribe(
      (recipeList : Recipe[]) => {
        this.selectedRecipe = this.recipeService.getRecipeById(this.selectedRecipe.id);
      }

    );


    // this.resolveSubscription = this.route.data.subscribe(
    //   (data: Data) => {
    //     this.selectedRecipe = data['recipe'];
    //   }
    // );

    // this.showBackOption = this.route.snapshot.data['backOption'];
    // this.route.data.subscribe(
    //   (data: Data) => {
    //     this.showBackOption = data['backOption'];
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
   // this.resolveSubscription.unsubscribe();
  }

  

  addIngredientsToShoppingList(){

    if(confirm('Proceed To Transfer Ingredients to Shopping Cart?')){
      this.shoppingListService.addAllIngradientsToShoppingList(this.selectedRecipe.recipeIngredients);
      this.router.navigate(['shoppingList']);
    }

  }

  editRecipe() {
    let canEdit: boolean = this.recipeService.canEditRecipe(this.selectedRecipe.id);
    this.router.navigate(['recipes', this.selectedRecipe.id, 'edit'], { queryParams: { canEditRecipe: canEdit } });
    //this.router.navigate(['edit'],{relativeTo : this.route});

  }
  onDeleteRecipe(){
    

    if(this.authService.isUserLoggedIn()){

      this.recipeService.removeRecipeFromList(this.selectedRecipe);
      this.router.navigate(['../'],{relativeTo : this.route});

    }else{
        alert('Please Login To proceed!');
        this.router.navigate(['/signin']);
    }
   

  }

}
