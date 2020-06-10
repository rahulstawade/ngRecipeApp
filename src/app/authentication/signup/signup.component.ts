import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  @ViewChild('form') signupForm : NgForm;

  //must contain : atleast - 1 Uppercase, 1 lowercase, 1 special character, 1 number
  //must not contain : space
  //min length 8
  passwordValidationPattern = "(?=^.{8,}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.*\\s).*$";

  ngOnInit(): void {
  }

  onClear(){
    this.signupForm.resetForm();
  }

  onSignup(){

    let email = this.signupForm.value.email;
    let password = this.signupForm.value.password;
    this.authService.signUpUser(email,password);
  }

}
