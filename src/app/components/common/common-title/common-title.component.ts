import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-common-title',
  templateUrl: './common-title.component.html',
  styles: [
  ]
})
export class CommonTitleComponent {
  
    @Input() title: any;
    @Input() bg: any;
    @Input() color: any;
  
    constructor(private router: Router) { }

    onBack(){
      this.router.navigate(['/tpps']);
    }
    onBackConfiguration(){
      this.router.navigate(['/configuracion']);
    }

}
