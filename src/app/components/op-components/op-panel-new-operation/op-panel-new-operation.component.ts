import { Component } from '@angular/core';
import { LoggerService, Tlog } from '../../../services/logger.service';
import { PositionsService } from '../../../services/positions.service';
import { FormGroup, FormControl } from '@angular/forms';
import { IPosition } from 'src/app/interfaces/IPosition.interface';

@Component({
  selector: 'app-op-panel-new-operation',
  templateUrl: './op-panel-new-operation.component.html',
  styles: [
  ]
})
export class OpPanelNewOperationComponent {
  
  formdata = {
    id: 1,
    accountid:  '1',
    block:      'B001',
    creation:   '2021-01-01',
    marketid:     '1',
    tickerid:     '1',
    datetimein:     '00:00',
    priceIN:    '0.0',
    contracts:  '1',
    profit:     '80',
    stoploss:   '-20',
    commision: '4.5',

  };

  constructor(private positionsService: PositionsService, private loggerService: LoggerService) {
   }

  ngOnInit(){

  }

  newOperation(){
    this.loggerService.log(Tlog.info, "New operation");
    this.positionsService.savePosition();
  }

  onClickSubmit(data: any) {
    //this.idaccount = data.idaccount;
    this.loggerService.log(Tlog.info, "FORM formdata:");
    this.loggerService.log(Tlog.info, data);

    this.positionsService.savePositionForm(data);
  }

}
