import { Injectable } from '@angular/core';
import { docData, Firestore } from '@angular/fire/firestore';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  get currentUserProfile$(): Observable<User | null> {
    return this.auth.currentUser$.pipe(
      switchMap(user => {
        if (!user?.uid){
          return of(null)
        }

        const ref = doc(this.firestore, 'users', user.uid);
        return docData(ref) as Observable<User>;

      })
    )
  }

  constructor(private firestore: Firestore, private auth: AuthService) { }

  addUser(user: User) : Observable<any> {
    const ref = doc(this.firestore, 'users', user.uid)
    return from(setDoc(ref, user));
  }

  updateUser(user: User) : Observable<any> {
    const ref = doc(this.firestore, 'users', user.uid)
    return from(updateDoc(ref, {...user}));
  }
  

}
