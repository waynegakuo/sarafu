import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {SharedModule} from "../../shared/shared.module";
import {UserLandingPageComponent} from "../../components/user-landing-page/user-landing-page.component";


@NgModule({
  declarations: [
    DashboardComponent,
    UserLandingPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgOptimizedImage
  ]
})
export class DashboardModule { }
