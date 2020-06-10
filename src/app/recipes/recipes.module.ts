import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { HighlightElementDirective } from '../directives/highlight-element.directive';
import { RecipeEditComponent } from './recipe-list/recipe-edit/recipe-edit.component';
import { RecipePreviewComponent } from './recipe-list/recipe-preview/recipe-preview.component';
import { RecipeStartComponent } from './recipe-list/recipe-start/recipe-start.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        HighlightElementDirective,
        RecipeEditComponent,
        RecipePreviewComponent,
        RecipeStartComponent,
        FilterPipe
    ],
    imports : [
        FormsModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ],
})
export class RecipesModule {}