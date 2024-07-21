import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-op-closed-operation',
  templateUrl: './op-closed-operation.component.html',
  styles: []
})
export class OpClosedOperationComponent   {
  @Input() position: any;
}
