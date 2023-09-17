import { Component } from '@angular/core';
import { LoggerService, Tlog } from '../../services/logger.service';
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

  constructor(private positionsService: PositionsService, private loggerService: LoggerService) {
    this.positions = new Array<IPosition> ;
   }

  ngOnInit(): void{

    this.positionsService.getAllByStatus('opened').subscribe({
      complete: () => {
          this.loggerService.log(Tlog.info, "positionsService.getAllByStatus(opened) vía http - Ended.");
      },
      next: (data: Array<IPosition>) => {
        this.loggerService.log(Tlog.info, "positionsService.getAllByStatus(opened) vía http - data:");
        this.loggerService.log(Tlog.info, data);
        this.positions = data;        
      },
      error: (e: any) => {
        this.loggerService.log(Tlog.error, "positionsService.getAllByStatus(opened) vía http - http error.");
        this.loggerService.log(Tlog.error, e);
      }
    });
  }

}
