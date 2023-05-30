import {inject, Injectable} from '@angular/core';
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
  UserCredential,
  getIdTokenResult,
  IdTokenResult, signInWithRedirect, getRedirectResult
} from '@angular/fire/auth';
import {doc, Firestore, setDoc} from '@angular/fire/firestore';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserData} from "../../../models/user-data.model";
import {GlobalService} from "../global/global.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router);
  globalService = inject(GlobalService);

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

  /**
   * This method logs in the user to the platform
   * using their email and password.
   * It uses Firebase Auth for checking if user exists in the database
   * and throws an error if otherwise
   */
  async loginUser(): Promise<void> {
    await signInWithEmailAndPassword(
      this.auth,
      String(this.loginForm.controls.email.value),
      String(this.loginForm.controls.password.value)
    )
      .then((userCredential: UserCredential) => {
        // this.getToken(userCredential);
        this.globalService.showSnackbar(`Welcome back`);
        return this.router.navigate(['../dashboard']);
      })
      .catch(error => {
        this.globalService.showSnackbar(error.message);
      });
  }

  /**
   * This method signs up the user to the platform
   * using the details provided in the registration form.
   * The user credential returned after creating the user with their email and password
   * is then sent over to createUserData to create a collection of users in the database.
   */
  async signUpUser(): Promise<void> {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      this.auth,
      String(this.signUpForm.controls.email.value),
      String(this.signUpForm.controls.password.value)
    )
    return this.createUserData(userCredential);
  }

  /**
   * Adds a new user to the users collection in the database.
   * @param user user credential details returned from createUserWithEmailAndPassword
   */
  createUserData(user: UserCredential): void {
    const userRef = doc(this.firestore, `users/${user.user.uid}`);

    const data: UserData = {
      uid: user.user.uid,
      displayName: this.signUpForm.controls.fullName.value,
      email: this.signUpForm.controls.email.value,
      country: this.signUpForm.controls.country.value,
      fullName: this.signUpForm.controls.fullName.value,
      authType: 'email-and-password'
    }
    setDoc(userRef, data, {merge: true})
      .then((data: void) => {
        // this.getToken(user);
        this.globalService.showSnackbar('Welcome to Sarafu');
        return this.router.navigate(['../dashboard']);
      })
  }

  async googleSignIn() {
    const provider = new GoogleAuthProvider();
    const userCred: UserCredential = await signInWithPopup(this.auth, provider);
    return this.updateUserData(userCred, 'google');
  }

  /**
   * This method signs out current logged-in user
   */
  async signOutUser() {
    await signOut(this.auth)
      .then(() => {
          // Clear all local storage items.
          localStorage.clear();
          return this.router.navigate(['../home']);
        }
      )
      .catch((error): void => {
          this.globalService.showSnackbar("Couldn't sign out. Please try again");
        }
      );
  }

  /**
   * This method gets the current logged-in user's authentication token
   * @param userCred
   */
  getToken(userCred: UserCredential): void {
    const user = userCred.user;
    getIdTokenResult(user, true)
      .then((token: IdTokenResult): void => {
        localStorage.setItem('sarafu-auth-token', token.token);
      });
  }

  /**
   * Takes info from the auth state and mirror it on the firestore document
   * This is where you could add any kind of custom data that you want
   * @param user user information gotten from the auth state
   * @param authType the type of authentication used
   */
  private updateUserData(user: UserCredential | null, authType: string) {
    const userRef = doc(this.firestore, `users/${user?.user.uid}`);
    const data = {
      uid: user?.user.uid,
      displayName: user?.user.displayName,
      email: user?.user.email,
      authType: authType
    }
    setDoc(userRef, data, {merge: true})
      .then(() => {
        // this.getToken(user);
        this.globalService.showSnackbar('Welcome to Sarafu');
        return this.router.navigate(['../dashboard']);
      })
  }
}
