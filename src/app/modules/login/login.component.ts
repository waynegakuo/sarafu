import {Component, inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errorMsg: string = '';

  formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  get provideFullYear(): number {
    const date: Date = new Date()
    return date.getFullYear();
  }

  loginUser(): void {
  }

  onGoogleSignUpClicked(): void {

  }
}
