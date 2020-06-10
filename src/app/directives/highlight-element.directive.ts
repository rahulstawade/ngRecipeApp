import { Directive, ElementRef, HostBinding, Renderer2, HostListener, Input } from '@angular/core';
import { ReciepeService } from '../recipes/services/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Directive({
  selector: '[appHighlightElement]'
})
export class HighlightElementDirective {
  constructor(private element: ElementRef,
    private renderer: Renderer2,
    private recipeService: ReciepeService,
    private route: ActivatedRoute,
    private router: Router) { }

  @Input() defaultColor: string;
  @Input('appHighlightElement') highlightColor: any[];
  @Input() recipe: Recipe;


  @HostBinding('style.backgroundColor') bgColor: string;

  @HostListener('mouseenter') MouseEnterEvent(eventData: Event) {
    this.renderer.addClass(this.element.nativeElement, 'grow');

    //  this.bgColor = this.highlightColor[0];
    // this.recipeService.recipeSelected.emit(this.recipe);
    this.router.navigate([this.recipe.id,'preview'], { relativeTo: this.route });
  }

  @HostListener('mouseleave') MouseLeaveEvent(eventData: Event) {
    this.renderer.removeClass(this.element.nativeElement, 'grow');
    // this.bgColor = this.defaultColor;
  }




}
