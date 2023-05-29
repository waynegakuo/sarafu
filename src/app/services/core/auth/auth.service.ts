import {inject, Injectable, Optional} from '@angular/core';
import {
  Auth,
  authState,
  signInAnonymously,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  user,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  UserCredential
} from '@angular/fire/auth';
import {EMPTY, map, Observable, Subscription, switchMap} from "rxjs";
import {doc, docData, Firestore, setDoc} from '@angular/fire/firestore';
import {traceUntilFirst} from "@angular/fire/performance";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly userDisposable: Subscription | undefined;
  private readonly user$: Observable<User | null> = EMPTY;

  currentUserId!: string;

  router = inject(Router);

  constructor(private readonly auth: Auth, private firestore: Firestore, private formBuilder: FormBuilder) {
    // Initialize the firebase auth instance.
    this.auth = getAuth();
    // Persist firebase auth session.
    this.auth.setPersistence(browserLocalPersistence);
  }

  // Login form
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  // Sign up form
  signUpForm = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    country: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.minLength(8)],
  });

  async loginUser(): Promise<void> {
    await signInWithEmailAndPassword(
      this.auth,
      String(this.loginForm.controls.email.value),
      String(this.loginForm.controls.password.value)
    );
  }

  async signUpUser(): Promise<void> {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      this.auth,
      String(this.signUpForm.controls.email.value),
      String(this.signUpForm.controls.password.value)
    )
    return this.createUserData(userCredential);
  }

  createUserData(user: UserCredential): void {
    const userRef = doc(this.firestore, `users/${user.user.uid}`);

    const data = {
      uid: user.user.uid,
      displayName: this.signUpForm.controls.fullName.value,
      email: this.signUpForm.controls.email.value,
      country: this.signUpForm.controls.country.value,
      fullName: this.signUpForm.controls.fullName.value
    }
    setDoc(userRef, data, {merge: true})
      .then((data: void) => {
        return this.router.navigate(['../home']);
      })
      .catch(error => {
        //TODO: Handle error via Snackbar
        console.log(error.message);
      });
  }
}
