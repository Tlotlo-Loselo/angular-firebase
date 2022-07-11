import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { FormsModule, ReactiveFormsModule , FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { first, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

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
    private authService: AuthService, 
    private router: Router, 
    private afAuth: AngularFireAuth, 
    private usersService: UsersService,
    private toast: HotToastService) {
    this.isProgressVisible = false;
    this.firebaseErrorMessage = '';
  }

  signupForm = new FormGroup({
  fName: new FormControl('', Validators.required),
  lName: new FormControl('', Validators.required),
  gender: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('',Validators.required),
  confirmPassword: new FormControl('', Validators.required)
  }, { validators: passwordsMatchValidator() });

  ngOnInit(): void {
    
  }

  signup() {
    if (!this.signupForm.valid)                 // if there's an error in the form, don't submit it
      return;
    
    const { fName, lName, gender, email, password } = this.signupForm.value;

    //const profileData = this.signupForm.value;
    this.authService.signupUser(email, password)
    .pipe(
      switchMap(({ user: {uid} }) => 
        this.usersService.addUser({ 
          uid, 
          email, 
          displayName: fName + ' ' + lName, 
          firstName: fName, 
          lastName: lName,
          gender: gender })
      ),
      this.toast.observe({
        success: 'Congrats! You have signed up.',
        loading: 'Signing in.',
        error: ({ message }) => `${message}`
      })
    )
    .subscribe(() => {
      this.router.navigate(['/dashboard'])
    });

  }

  get fName() {
    return this.signupForm.get('fName');
  }

  get lName() {
    return this.signupForm.get('lName');
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
