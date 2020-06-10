import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @Output() onAddIngredientEvent = new EventEmitter<{ name: string, amount: number }>();

  buttonName: string = 'Add';
  isUpdate: boolean = false;
  indexOfIngredientToUpdate: number;
  editIngredientSubscription: Subscription;

  // ingredientName : string;
  // ingredientAmount : number;  

  // @ViewChild('ingredientAmount') amount : ElementRef;

  @ViewChild('form') shoppingForm: NgForm;

  // constructor(private renderer : Renderer2) { }
  constructor(private shoppingListService: ShoppingListService) { }
  ngOnDestroy(): void {
    this.editIngredientSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.editIngredientSubscription = this.shoppingListService.editShoppingListEvent.subscribe(
      (indexOfIngredientInShpngList: number) => {
        this.indexOfIngredientToUpdate = indexOfIngredientInShpngList;
        let ingredientToEdit: Ingredient = this.shoppingListService.getIngredientFromIndex(this.indexOfIngredientToUpdate);

        this.shoppingForm.setValue({
          'IngredientName': ingredientToEdit.name,
          'IngrediantAmount': ingredientToEdit.amount
        });

        this.buttonName = 'update';
        this.isUpdate = true
      }
    );


  }

  // onClickAddIngredient(ingredientNameInputField : HTMLInputElement){    
  //   this.onddAIngredientEvent.emit({
  //     name : ingredientNameInputField.value,
  //     amount : this.amount.nativeElement.value
  //   });
  // }
  // onClickOnClear(ingredientNameInputField : HTMLInputElement){
  //   ingredientNameInputField.value='';    
  //   this.renderer.setProperty(this.amount.nativeElement,'value','');
  // }

  onSubmitEvent() {

    if (!this.isUpdate) {
      this.onAddIngredientEvent.emit({
        name: this.shoppingForm.value.IngredientName,
        amount: this.shoppingForm.value.IngrediantAmount
      });
    } else if (this.isUpdate) {
      this.shoppingListService.updateInredientInShoppingList(this.indexOfIngredientToUpdate,
        new Ingredient(this.shoppingForm.value['IngredientName'], this.shoppingForm.value['IngrediantAmount']));
    }

    this.shoppingForm.resetForm();
    this.buttonName= 'Add';
    this.isUpdate = false;
  }

  onClickOnClear() {

    this.shoppingForm.resetForm();
    this.buttonName= 'Add';
    this.isUpdate = false;

    // this.shoppingForm.setValue({
    //   'IngredientName' : '',
    //   'IngrediantAmount' : ''
    // }); 

  }

  



}
