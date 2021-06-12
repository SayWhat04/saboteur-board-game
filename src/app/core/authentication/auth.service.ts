import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {first, switchMap} from 'rxjs/operators';
import {User} from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData({uid, email, displayName, photoURL}) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, {merge: true});
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

}
