import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/core/auth/auth.service";
import {GlobalService} from "../../services/core/global/global.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  errorMsg!: string;

  public authService: AuthService = inject(AuthService);
  globalService = inject(GlobalService);

  get provideFullYear(): number {
    const date: Date = new Date()
    return date.getFullYear();
  }

  signUpUser(): void {
    this.authService.signUpUser()
      .catch(error => {
        this.globalService.showSnackbar(error.message);
      });
  }

  googleSignUp(): void {
    this.authService.googleSignIn()
      .catch(error => {
        this.globalService.showSnackbar(error.message);
      });
  }

}
