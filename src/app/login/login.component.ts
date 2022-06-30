import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth } from '@angular/fire/auth';
import { HotToastService } from '@ngneat/hot-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (!this.loginForm.valid) {
      return
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password)
  }

}
