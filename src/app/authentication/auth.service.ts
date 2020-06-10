import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  token: string;


  isUserLoggedIn() {
    return this.token != null;
  }

  getStoredToken(): string {

    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
        }
      );

    return this.token;

  }

  logoutUser() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/signin']);
    alert('Successfully Logged out!');
  }

  sigInUser(email: string, password: string) {

    firebase.auth().signInWithEmailAndPassword(email, password)

      .then(
        response => {
          console.log(response);

          //fetching stored token and assigning it to our Token Ivar
          firebase.auth().currentUser.getIdToken()
            .then(
              token => {
                this.token = token;
              }
            );

          alert('Login Succesfull!');
          this.router.navigate(['/']);
        }
      )

      .catch(
        error => {
          console.log(error);
          alert('User with EmailId : ' + email + ' failed to Login!');
        }
      );

  }

  signUpUser(email: string, password: string) {

    firebase.auth().createUserWithEmailAndPassword(email, password)

      .then(
        (response) => {
          console.log(response);

          alert('User With EmailId :' + email + ' created Successfully!');
          this.router.navigate(['/signin']);
        }
      )

      .catch(
        (error) => {
          console.log(error);
          alert('SignUp for EmailId :' + email + ' Failed');
        }
      );

  }

}
