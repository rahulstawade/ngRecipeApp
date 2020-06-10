import { Component, OnInit, Input, Output, EventEmitter, HostListener, Renderer2, ElementRef, HostBinding } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { ReciepeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

 @Input() recipe : Recipe;
 //@Output() onReciepeHover = new EventEmitter<void>();

 constructor(private element : ElementRef, 
  private renderer : Renderer2,
  private recipeService : ReciepeService,
  private route :ActivatedRoute,
  private router:Router) { }


//  @HostListener('mouseenter') mouseEnteringTheReciepe(event : Event){
//   //this.onReciepeHover.emit();  
//   this.recipeService.recipeSelected.emit(this.recipe);
//  }


// @HostListener('click') onMouseClick(eventData : Event){    
//   this.renderer.addClass(this.element.nativeElement,'grow');
//   this.bgColor = 'red';
//   // this.recipeService.recipeSelected.emit(this.recipe);
//   setTimeout(() => {      
//   this.router.navigate([this.recipe.id],{relativeTo:this.route});
//   }, 10);
// }
 

  ngOnInit(): void {
  }

}
  