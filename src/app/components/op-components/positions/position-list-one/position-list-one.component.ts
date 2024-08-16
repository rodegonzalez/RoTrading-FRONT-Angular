import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-position-list-one',
  templateUrl: './position-list-one.component.html',
  styleUrls: ['./position-list-one.component.css'
  ]
})
export class PositionListOneComponent {
  @Input() position: any;
}
