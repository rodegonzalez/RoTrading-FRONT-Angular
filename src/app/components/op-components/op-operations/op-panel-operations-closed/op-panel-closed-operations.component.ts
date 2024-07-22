import { Component } from '@angular/core';
import { LoggerService, Tlog } from '../../../../services/logger.service';
import { PositionsService } from '../../../../services/positions.service';
import { IPositionView } from '../../../../interfaces/IPosition.interface';

@Component({
  selector: 'app-op-panel-closed-operations',
  templateUrl: './op-panel-closed-operations.component.html',
  styles: []
})
export class OpPanelClosedOperationsComponent {
  positions: Array<IPositionView>;

  constructor(private positionsService: PositionsService, private loggerService: LoggerService) {
    this.positions = new Array<IPositionView> ;
   }

  ngOnInit(): void{

    this.positionsService.getAllByStatus('notopened').subscribe({
      complete: () => {
          this.loggerService.log(Tlog.info, "positionsService.getAllByStatus(notopened) vía http - Ended.");

      },
      next: (data: Array<IPositionView>) => {
        this.loggerService.log(Tlog.info, "positionsService.getAllByStatus(notopened) vía http - data:");
        this.loggerService.log(Tlog.info, data);
        this.positions = data;        
      },
      error: (e: any) => {
        this.loggerService.log(Tlog.error, "positionsService.getAllByStatus(notopened) vía http - http error.");
        this.loggerService.log(Tlog.error, e);
      }
    });
  }
}
