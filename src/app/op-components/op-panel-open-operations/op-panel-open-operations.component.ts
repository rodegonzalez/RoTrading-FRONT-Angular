import { Component } from '@angular/core';
import { PositionsService } from '../../services/positions.service';
import { IPositionLower } from '../../interfaces/IPosition.interface';

@Component({
  selector: 'app-op-panel-open-operations',
  templateUrl: './op-panel-open-operations.component.html',
  styles: [
  ]
})
export class OpPanelOpenOperationsComponent {
  positions: Array<IPositionLower>;

  constructor(private positionsService: PositionsService) {
    this.positions = new Array<IPositionLower> ;
   }

  ngOnInit(): void{

    this.positionsService.getAllOpened().subscribe({
      complete: () => {
          console.log("positionsService.getAllOpened() vía http - Ended.");

      },
      next: (data: Array<IPositionLower>) => {
        console.log("positionsService.getAllOpened() vía http - data:");
        console.log(data);
        this.positions = data;        
      },
      error: (e: any) => {
        console.log("positionsService.getAllOpened() vía http - http error.");
        console.log(e);
      }
    });
  }
}
