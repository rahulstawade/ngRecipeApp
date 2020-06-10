import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {

  @HostBinding('class.open') toggleDDStatus = false;

  @HostListener('click') toggleDropDown(){
    this.toggleDDStatus = !this.toggleDDStatus;
  }

  constructor() { }

}
