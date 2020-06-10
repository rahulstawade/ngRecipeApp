import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({

    declarations : [
        HeaderComponent,    
        HomeComponent,    
        PageNotFoundComponent  
    ],
    imports:[
        SharedModule,
        AppRoutingModule
    ],
    exports:[        
        HeaderComponent,
        AppRoutingModule
    ]

})
export class CoreModule{}