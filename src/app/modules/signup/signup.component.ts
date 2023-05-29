import {Component, inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  errorMsg!: string;

  formBuilder: FormBuilder = inject(FormBuilder);

  get provideFullYear(): number {
    const date: Date = new Date()
    return date.getFullYear();
  }

  // Sign up form
  signUpForm = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    country: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.minLength(8)],
  });

  signUpUser(): void {
  }

  googleSignUp(): void {

  }

}
