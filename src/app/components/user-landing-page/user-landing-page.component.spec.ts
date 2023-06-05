import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLandingPageComponent } from './user-landing-page.component';

describe('UserLandingPageComponent', () => {
  let component: UserLandingPageComponent;
  let fixture: ComponentFixture<UserLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLandingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
