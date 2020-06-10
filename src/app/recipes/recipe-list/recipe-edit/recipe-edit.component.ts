import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { ReciepeService } from '../../services/recipe.service';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { CanDeactivateComponent } from 'src/app/shared/guards/canDeactivate-guard.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy, CanDeactivateComponent {

  recipeToEdit: Recipe;
  canEditIndicator: boolean = false;
  isForNewRecipe: boolean = false;
  submitButtonName: string = 'Save';
  pageHeaderName: string = 'Add New Recipe :'
  paramsSubscription: Subscription;
  changesSaved: boolean = false;

  recipeForm: FormGroup;
  recipeTypeList = ['veg', 'nonveg'];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private recipeServive: ReciepeService) { }


  ngOnInit(): void {

    this.createAndInitializeRecipeForm();

    // this.recipeToEdit = this.getRecipeById(+this.route.snapshot.params['id']);
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {

        this.isForNewRecipe = params['id'] == null;

        //IS FOR EDIT
        if (!this.isForNewRecipe) {
          this.recipeToEdit = this.getRecipeById(+params['id']);

          this.mapRecipeObjToForm();

          this.submitButtonName = 'Update';
          this.pageHeaderName = 'Edit Recipe :'

        }

      }
    );


    //this.setCanEditIndicator(this.route.snapshot.queryParams['canEditRecipe']);
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (!this.isForNewRecipe) {
          this.setCanEditIndicator(params['canEditRecipe']);
        }
      }
    );

  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  getRecipeById(id: number): Recipe {
    return this.recipeServive.getRecipeById(id);
  }

  setCanEditIndicator(indicator: string) {
    if (indicator === 'true') {
      this.canEditIndicator = true;
    } else {
      this.canEditIndicator = false;
    }
  }
  onSubmitEvent() {

    if (this.isForNewRecipe) {
      this.onAddRecipe();
    } else {
      this.onEditRecipe();
    }

  }

  onCancelEvent() {
    if (this.isForNewRecipe) {
      this.cancelNewRecipe();
    } else {
      this.cancelEdit();
    }
  }

  onResetEvent() {

    if (this.isForNewRecipe) {
      this.createAndInitializeRecipeForm();
      //Using reset we can clear all values or pass arg(formGroup object) to reset 
      //this.recipeForm.reset(this.createAndInitializeRecipeForm());

    } else {
      this.mapRecipeObjToForm();
    }

  }

  onAddRecipe() {

    let newRecipeCreated: Recipe = this.mapFormToRecipeObj();

    let idOfNewRecipe = this.recipeServive.addNewRecipeToList(newRecipeCreated);

    this.router.navigate(['recipes', idOfNewRecipe]);

  }

  cancelNewRecipe() {
    this.router.navigate(['recipes']);
  }

  onEditRecipe() {

    let recipeToEdit: Recipe = this.mapFormToRecipeObj();

    this.recipeServive.editRecipe(recipeToEdit);
    this.changesSaved = true;

    this.router.navigate(['../'], { relativeTo: this.route });


  }
  cancelEdit() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  mapFormToRecipeObj(): Recipe {

    let recipe: Recipe = new Recipe();

    recipe.id = this.recipeForm.value.recipeId;
    recipe.name = this.recipeForm.value.recipeData.recipeName;
    recipe.description = this.recipeForm.value.recipeData.recipeDescription;
    recipe.type = this.recipeForm.value.recipeData.recipeType;
    recipe.imagePath = this.recipeForm.value.recipeData.recipeImagePath;

    let recipeIngredientsList: Array<Ingredient> = new Array();
    for (let i = 0; i < this.recipeForm.value.ingredientList.length; i++) {

      recipeIngredientsList.push(new Ingredient(this.recipeForm.value.ingredientList[i].ingredientName,
        this.recipeForm.value.ingredientList[i].ingredientQty));

    }
    recipe.recipeIngredients = recipeIngredientsList;

    return recipe;

  }

  mapRecipeObjToForm() {

    let ingredientArrayInRecipe = new FormArray([]);

    for (let ingredient of this.recipeToEdit.recipeIngredients) {

      ingredientArrayInRecipe.push(
        new FormGroup({
          'ingredientName': new FormControl(ingredient.name, Validators.required),
          'ingredientQty': new FormControl(ingredient.amount, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        })
      );

    }

    this.recipeForm = new FormGroup({

      'recipeId': new FormControl(this.recipeToEdit.id, Validators.required),
      'recipeData': new FormGroup({
        'recipeName': new FormControl(this.recipeToEdit.name, Validators.required),
        'recipeDescription': new FormControl(this.recipeToEdit.description),
        'recipeType': new FormControl(this.recipeToEdit.type, Validators.required),
        'recipeImagePath': new FormControl(this.recipeToEdit.imagePath)
      }),
      'ingredientList': ingredientArrayInRecipe
    });

  }



  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.canEditIndicator) {
      return true;
    }
    return this.areOriginalValuesChanged();

  }

  areOriginalValuesChanged(): Observable<boolean> | Promise<boolean> | boolean {


    if (
      (this.recipeToEdit.name !== this.recipeForm.value['recipeData'].recipeName ||
        this.recipeToEdit.description !== this.recipeForm.value['recipeData'].recipeDescription ||
        this.recipeToEdit.type !== this.recipeForm.value['recipeData'].recipeType ||
        this.recipeToEdit.imagePath !== this.recipeForm.value['recipeData'].recipeImagePath)
      &&
      !this.changesSaved) {

      return confirm('Do you Want to Discard the changes?');


    } else {
      return true;
    }
  }

  onAddIngredientsInRecipe() {

    let ingredientGroup = new FormGroup({
      'ingredientName': new FormControl(null, Validators.required),
      'ingredientQty': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (<FormArray>this.recipeForm.get('ingredientList')).push(ingredientGroup);
  }

  onRemoveIngredientFromRecipe(ingredientIndex: number) {

    (<FormArray>this.recipeForm.get('ingredientList')).removeAt(ingredientIndex);

  }


  createAndInitializeRecipeForm(): FormGroup {

    let ingredientListForRecipe = new FormArray([]);


    this.recipeForm = new FormGroup({

      'recipeId': new FormControl(),

      'recipeData': new FormGroup({
        'recipeName': new FormControl('', [Validators.required]),
        'recipeDescription': new FormControl(),
        'recipeType': new FormControl('veg'),
        'recipeImagePath': new FormControl('assets/ImagesForRecipies/recipeLogo2.png')
      }),

      'ingredientList': ingredientListForRecipe

    });

    return this.recipeForm;

  }

}
