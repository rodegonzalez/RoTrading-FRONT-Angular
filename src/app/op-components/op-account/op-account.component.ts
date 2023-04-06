import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-op-account',
  templateUrl: './op-account.component.html',
  styles: []
})
export class OpAccountComponent {
  @Input() account: any;
}
