import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { BackendAppCommunicationService } from './shared/services/backend-app-communication.service';
import { ReciepeService } from './recipes/services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ngCourseProject';
  constructor(private backEndService : BackendAppCommunicationService,private recpeService : ReciepeService){}

  ngOnInit(): void {

    firebase.initializeApp(
      {
        apiKey: "AIzaSyCcIZA899I1ZprtZdcrwDx9dMdZAVG7qCQ",
        authDomain: "ng-recipe-app-project.firebaseapp.com"
      }
    );

/*     this.backEndService.fetchAllRecipiesFromBackEnd().subscribe(
      (recipesData) => {
        console.log('Fetched Recipe List : ');
        console.log(recipesData);
          this.recpeService.setRecipiesList(recipesData);
          this.recpeService.recipeListChanged.next(this.recpeService.recipiesList);
      },
      (error) => {
          alert(error);
      }
  ); */

  }


  // tabSelected : String = 'Recipie';


  // onSectionSelection(selectedTab : String){

  //   this.tabSelected = selectedTab;
  // }
}
