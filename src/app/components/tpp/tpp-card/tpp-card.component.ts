import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tpp-card',
  templateUrl: './tpp-card.component.html',
  styleUrls: ['./tpp-card.component.css']
})
export class TppCardComponent {
  @Input() item: any;
}

