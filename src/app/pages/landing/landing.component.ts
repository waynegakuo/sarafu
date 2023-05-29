import {Component} from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  onApiDocBtnClicked() {
    window.open('https://quikk.dev/index.html', '_blank');
  }

}
