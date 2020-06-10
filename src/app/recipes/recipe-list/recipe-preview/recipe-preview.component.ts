import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ReciepeService } from '../../services/recipe.service';
import { Recipe } from '../../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.css']
})
export class RecipePreviewComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
    private recipeService: ReciepeService) { }

  recipeForPreview: Recipe;
  paramsSubscription: Subscription;


  ngOnInit(): void {
    
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.recipeForPreview = this.recipeService.getRecipeById(+params['id']);
      }
    );

  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
