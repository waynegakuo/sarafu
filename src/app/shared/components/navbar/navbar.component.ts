import {Component, inject} from '@angular/core';
import {AuthService} from "../../../services/core/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  private authService = inject(AuthService);

  onSignOutUserClicked() {
    this.authService.signOutUser();
  }


}
