import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-divisa-card',
  templateUrl: './divisa-card.component.html',
  styleUrls: ['./divisa-card.component.css']
})
export class DivisaCardComponent {
  @Input() item: any;

  constructor( private router: Router) {
  }

}

