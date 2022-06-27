import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(private auth: Auth) { }

  ngOnInit(): void {
  }

  handleLogin(value: any) {
    signInWithEmailAndPassword(this.auth, value.email, value.password)
    .then((Response: any) => {
      console.log(Response.user)
    })
    .catch((err) => {
      alert(err.message);
    })
  }

}
