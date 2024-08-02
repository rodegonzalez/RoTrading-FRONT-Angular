import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tpp-card',
  templateUrl: './tpp-card.component.html',
  styleUrls: ['./tpp-card.component.css']
})
export class TppCardComponent {
  @Input() item: any;

  constructor( private router: Router) {
  }



}

