import { Component } from '@angular/core';
import { LoggerService, Tlog } from '../../services/logger.service';
import { PositionsService } from '../../services/positions.service';
import { IPosition } from '../../interfaces/IPosition.interface';

@Component({
  selector: 'app-op-panel-closed-operations',
  templateUrl: './op-panel-closed-operations.component.html',
  styles: []
})
export class OpPanelClosedOperationsComponent {
  positions: Array<IPosition>;

  constructor(private positionsService: PositionsService, private loggerService: LoggerService) {
    this.positions = new Array<IPosition> ;
   }

  ngOnInit(): void{

    this.positionsService.getAllByStatus('notopened').subscribe({
      complete: () => {
          //console.log("positionsService.getAllByStatus(notopened) vía http - Ended.");
          this.loggerService.log(Tlog.info, "positionsService.getAllByStatus(notopened) vía http - Ended.");

      },
      next: (data: Array<IPosition>) => {
        //console.log("positionsService.getAllByStatus(notopened) vía http - data:");
        //console.log(data);
        this.loggerService.log(Tlog.info, "positionsService.getAllByStatus(notopened) vía http - data:");
        this.loggerService.log(Tlog.info, data);
        this.positions = data;        
      },
      error: (e: any) => {
        //console.log("positionsService.getAllByStatus(notopened) vía http - http error.");
        //console.log(e);
        this.loggerService.log(Tlog.error, "positionsService.getAllByStatus(notopened) vía http - http error.");
        this.loggerService.log(Tlog.error, e);
      }
    });
  }
}
