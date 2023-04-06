import { Component } from '@angular/core';
import { PositionsService } from '../../services/positions.service';
import { IPosition } from '../../interfaces/IPosition.interface';

@Component({
  selector: 'app-op-panel-closed-operations',
  templateUrl: './op-panel-closed-operations.component.html',
  styles: []
})
export class OpPanelClosedOperationsComponent {
  positions: Array<IPosition>;

  constructor(private positionsService: PositionsService) {
    this.positions = new Array<IPosition> ;
   }

  ngOnInit(): void{

    this.positionsService.getAllNotOpened().subscribe({
      complete: () => {
          console.log("positionsService.getAllNotOpened() vía http - Ended.");

      },
      next: (data: Array<IPosition>) => {
        console.log("positionsService.getAllNotOpened() vía http - data:");
        console.log(data);
        this.positions = data;        
      },
      error: (e: any) => {
        console.log("positionsService.getAllNotOpened() vía http - http error.");
        console.log(e);
      }
    });
  }
}
