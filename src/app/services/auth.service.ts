import { Injectable, NgZone } from '@angular/core';
import { addDoc, Firestore, collection } from 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { User } from './user';
import * as auth from 'firebase/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Auth, authState, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$ = authState(this.auth);

  userData: any; // Save logged in user data

  constructor(
    private toast: HotToastService,
    private auth: Auth,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone           // NgZone service to remove outside scope warning
    ) { }




  // Sign up with email/password

    signupUser(fName: string, lName: string, email: string, password: string) {
      return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        switchMap(({ user }) => updateProfile(user, {displayName: fName + ' ' + lName})),
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

  /*signupUser(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();

        this.afs.doc('users/' + emailLower)                        // on a successful signup, create a document in 'users' collection with the new user's info
          .set({
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            displayName: user.firstName +' '+ user.lastName,
            //displayName_lower: user.displayName.toLowerCase(),
            email: user.email,
            email_lower: emailLower
          });

        
      })
      .catch(error => {
        console.log('Auth Service: signup error', error);
        if (error.code)
          return { isValid: false, message: error.message };
      });
  }*/

 /* SignUp(user: any): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {

        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }*/

  // Login in with email/password

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password))
    .pipe(this.toast.observe({
      success: 'Logged in successfully',
      loading: 'Logging in...',
      error: 'There was an error. Please make sure you have entered the correct credentials'
    }))
    .subscribe(() => {
      this.router.navigate(['/dashboard'])
    });
  }



  // Sign out

  logout() {
    return from(this.auth.signOut())
    .pipe(this.toast.observe({
      success: 'Logged out successfully',
      loading: 'Logging out...',
      error: 'There was an error.'
    }))
    .subscribe(() => {
      this.router.navigate(['/home'])
    });
  }





  
  /******** C R U D ********/

  // Setting the user data
  
  /*SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.email_lower}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastNAme: user.lastNAme,
      gender: user.gender,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }*/

  /*updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;

    return of(user).pipe(
      concatMap(user => {
        if (!user) throw new Error('Not Authenticated');

        return updateProfile(user, profileData)
      })
    )

  }*/

  

}
