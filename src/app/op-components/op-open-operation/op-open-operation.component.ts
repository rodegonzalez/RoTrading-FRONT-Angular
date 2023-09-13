import { Component, Input } from '@angular/core';
import { IPosition } from 'src/app/interfaces/IPosition.interface';

@Component({
  selector: 'app-op-open-operation',
  templateUrl: './op-open-operation.component.html',
  styles: [
  ]
})
export class OpOpenOperationComponent {
  @Input() position: any;

}
