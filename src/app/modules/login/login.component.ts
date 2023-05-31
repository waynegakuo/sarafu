import {Component, inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {GlobalService} from "../../services/core/global/global.service";
import {AuthService} from "../../services/core/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errorMsg: string = '';

  formBuilder = inject(FormBuilder);
  globalService = inject(GlobalService);
  authService = inject(AuthService);

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  get provideFullYear(): number {
    const date: Date = new Date()
    return date.getFullYear();
  }

  loginUser(): void {
    this.authService.loginUser();
  }

  onGoogleSignInClicked(): void {
    this.authService.googleSignIn()
      .catch(error => {
        this.globalService.showSnackbar(error.message);
      });
  }
}
