import {Component, inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/core/auth/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  errorMsg!: string;

  formBuilder: FormBuilder = inject(FormBuilder);
  public authService: AuthService = inject(AuthService);

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
    //TODO: handle then for happy and error paths
    this.authService.signUpUser();
  }

  googleSignUp(): void {

  }

}
