import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-subtitle',
  templateUrl: './common-subtitle.component.html', 
  styles: []
})
export class CommonSubtitleComponent {

  @Input() subtitle: any;

  constructor() { }

  
}
