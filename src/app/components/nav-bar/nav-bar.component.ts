import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: []
})
export class NavBarComponent {  

  currentDateTimeHead: string;
  constructor() {
        this.currentDateTimeHead = new Date().toString();
   }

   ngOnInit(): void{
    this.updateDateTime2();
    setInterval(() => this.updateDateTime2(), 1000)

}
updateDateTime2(): void {  
  let now: any = new Date();
  this.currentDateTimeHead = now.toLocaleTimeString('es-ES');



}}

