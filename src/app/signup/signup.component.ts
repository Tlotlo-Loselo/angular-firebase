import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { FormsModule, ReactiveFormsModule , FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function passwordsMatchValidator(): ValidatorFn{     //Cross Validation
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true
      }
    }
    return null;

  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //user$ = this.authService.currentUser$;
  isProgressVisible: boolean;
  //signupForm!: FormGroup;
  firebaseErrorMessage: string;
  hide = true;

  constructor(
    private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    this.isProgressVisible = false;
    this.firebaseErrorMessage = '';
  }

  signupForm = new FormGroup({
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  gender: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('',Validators.required),
  confirmPassword: new FormControl('', Validators.required)
  }, { validators: passwordsMatchValidator() });

  ngOnInit(): void {
    
  }

  signup() {
    if (this.signupForm.invalid)                            // if there's an error in the form, don't submit it
        return;

    this.isProgressVisible = true;
    this.authService.signupUser(this.signupForm.value).then((result) => {
        if (result == null)                                 // null is success, false means there was an error
            this.router.navigate(['/dashboard']);
        else if (result.isValid == false)
            this.firebaseErrorMessage = result.message;

        this.isProgressVisible = false;                     // no matter what, when the auth service returns, we hide the progress indicator
    }).catch(() => {
        this.isProgressVisible = false;
    });
  }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

}
