import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-nav-bar></app-nav-bar>
    <div class="container" style="margin-top: 120px;">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {}

