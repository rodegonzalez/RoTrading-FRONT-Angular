import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pattern-card',
  templateUrl: './pattern-card.component.html',
  styleUrls: ['./pattern-card.component.css']
})
export class PatternCardComponent {
  @Input() item: any;

  constructor( private router: Router) {
  }

}

