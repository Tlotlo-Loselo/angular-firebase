import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  hide = true;

  constructor(public auth: Auth) {

  }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      //'firstName': new FormControl('', Validators.required),
      //'lastName': new FormControl('', Validators.required),
      //'gender': new FormControl('', Validators.required),
      //'mobile': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('',Validators.required)
  });
  }

    


  handleRegister(value: any) {
    createUserWithEmailAndPassword(this.auth, value.email, value.password)
    .then((Response: any) => {
      console.log(Response.user)
    })
    .catch((err) => {
      alert(err.message);
    })
  }

}
