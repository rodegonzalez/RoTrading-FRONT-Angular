import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-op-open-operation',
  templateUrl: './op-open-operation.component.html',
  styles: [
  ]
})
export class OpOpenOperationComponent {
  @Input() position: any;
}
