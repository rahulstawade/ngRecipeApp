 import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-list/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipePreviewComponent } from './recipe-list/recipe-preview/recipe-preview.component';
import { RecipeEditComponent } from './recipe-list/recipe-edit/recipe-edit.component';
import { CanDeactivateGuard } from '../shared/guards/canDeactivate-guard.service';
import { AuthenticationGuard } from '../shared/guards/auth-guard.service';
import { RecipeResolver } from '../shared/guards/recipe-resolver.service';


const recipesRoutes: Routes = [

    {
        path: '', component: RecipesComponent, children: [
            { path: '', component: RecipeStartComponent },
            // { path: ':id', component: RecipeDetailComponent, resolve: { recipe: RecipeResolver } },
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/preview', component: RecipePreviewComponent },
            { path: ':id/edit', component: RecipeEditComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    },
    // { path: 'recipes/:id/view', component: RecipeDetailComponent, data: { backOption: true } },
    { path: 'recipe/new', component: RecipeEditComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule],
    providers : [RecipeResolver]
})
export class RecipesRoutingModule { }