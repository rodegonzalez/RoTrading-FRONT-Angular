import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-setup-card',
  templateUrl: './setup-card.component.html',
  styleUrls: ['./setup-card.component.css']
})
export class SetupCardComponent {
  @Input() item: any;

  constructor( private router: Router) {
  }

}

