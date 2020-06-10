import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        SharedModule,
        AuthRoutingModule        
    ]
})
export class AuthModule { }