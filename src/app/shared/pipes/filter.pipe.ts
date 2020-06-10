import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';

@Pipe({
  name: 'filter',
  pure:false  
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propertyName: string): Array<Recipe> {

    if (value.length == 0 || filterString == '' || propertyName =='') {
      return value;
    }

    const filteredRecipeList = new Array<Recipe>();

    for (let recipe of value) {


      if (recipe[propertyName].toLowerCase().includes(filterString.toLowerCase())) {
        filteredRecipeList.push(recipe);
      }

    }

    return filteredRecipeList;


  }

}
