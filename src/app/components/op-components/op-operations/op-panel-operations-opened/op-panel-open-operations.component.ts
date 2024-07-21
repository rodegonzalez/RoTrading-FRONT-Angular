import { Component } from '@angular/core';
import { LoggerService, Tlog } from '../../../../services/logger.service';
import { PositionsService } from '../../../../services/positions.service';
import { IPositionView } from '../../../../interfaces/IPosition.interface';

@Component({
  selector: 'app-op-panel-open-operations',
  templateUrl: './op-panel-open-operations.component.html',
  styles: [
  ]
})
export class OpPanelOpenOperationsComponent {
  positions: Array<IPositionView>;
  currentDateTime: string;
  constructor(private positionsService: PositionsService, private loggerService: LoggerService) {
    this.positions = new Array<IPositionView>;

    this.currentDateTime = new Date().toString();
   }

  ngOnInit(): void{

    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);

    this.positionsService.getAllByStatus('opened').subscribe({
      complete: () => {
          this.loggerService.log(Tlog.info, "positionsService.getAllByStatus(opened) vía http - Ended.");
      },
      next: (data: Array<IPositionView>) => {
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
  updateDateTime(): void {
    //const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    //this.currentDateTime = fecha.toLocaleDateString('es-ES', opciones) + ' ' + fecha.toLocaleTimeString('es-ES');
    this.currentDateTime = new Date().toLocaleTimeString('es-ES');
  }

}
