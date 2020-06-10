import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  @ViewChild('form') signupForm : NgForm;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  onSignIn(){
    let emailId = this.signupForm.value.email;
    let password = this.signupForm.value.password;
    this.authService.sigInUser(emailId,password);
  }

  
  onClear(){
    this.signupForm.resetForm();
  }


}
