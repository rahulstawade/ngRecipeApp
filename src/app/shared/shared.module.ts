 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownDirective } from '../directives/drop-down.directive';
import { FormsModule } from '@angular/forms';

@NgModule({

    declarations :[
        DropDownDirective
    ],
    exports : [
        CommonModule,
        DropDownDirective
    ]
})
export class SharedModule{}