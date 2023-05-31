import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {AuthService} from "../services/core/auth/auth.service";

@Directive({
  selector: '[appShowIfLoggedIn]'
})
export class ShowIfLoggedInDirective implements OnInit, OnDestroy {
  @Input() appShowIfLoggedIn!: boolean;
  subs!: Subscription;

  constructor(private authService: AuthService,
              private viewContainer: ViewContainerRef,
              private templateRef: TemplateRef<any>) {
  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.subs = this.authService.user$.subscribe(
      isLoggedIn => {
        this.viewContainer.clear();
        // We check if the snapShot returned is a function. A function means the user is logged in
        if (typeof (isLoggedIn) === 'function') {
          if (this.appShowIfLoggedIn) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
        } else {
          if (this.appShowIfLoggedIn) {
            this.viewContainer.clear();
          } else {
            this.viewContainer.createEmbeddedView(this.templateRef);
          }
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
