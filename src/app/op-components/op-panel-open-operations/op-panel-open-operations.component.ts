import { Component } from '@angular/core';
import { PositionsService } from '../../services/positions.service';
import { IPosition } from '../../interfaces/IPosition.interface';

@Component({
  selector: 'app-op-panel-open-operations',
  templateUrl: './op-panel-open-operations.component.html',
  styles: [
  ]
})
export class OpPanelOpenOperationsComponent {
  positions: Array<IPosition>;

  constructor(private positionsService: PositionsService) {
    this.positions = new Array<IPosition> ;
   }

  ngOnInit(): void{

    this.positionsService.getAllByStatus('opened').subscribe({
      complete: () => {
          console.log("positionsService.getAllByStatus(opened) vía http - Ended.");

      },
      next: (data: Array<IPosition>) => {
        console.log("positionsService.getAllByStatus(opened) vía http - data:");
        console.log(data);
        this.positions = data;        
      },
      error: (e: any) => {
        console.log("positionsService.getAllByStatus(opened) vía http - http error.");
        console.log(e);
      }
    });
  }
}
