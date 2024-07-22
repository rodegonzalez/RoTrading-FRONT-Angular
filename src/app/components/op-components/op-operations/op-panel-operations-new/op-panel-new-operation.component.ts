import { Component } from '@angular/core';
import { LoggerService, Tlog } from '../../../../services/logger.service';
import { PositionsService } from '../../../../services/positions.service';
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
    modification:   '2021-01-01',

    datetimein:     '00:00',
    datetimeout:     '00:00',
    priceIN:    '0.0',
    priceOUT:    '0.0',
    contracts:  '1',
    profit:     '80',
    stoploss:   '-20',
    commision: '4.5',
    tppCheck:   '1',
    isrealCheck: '1',
    temporal:   'm5',
    Note:       '',
    
    divisaid:     '1',
    marketid:     '1',
    tickerid:     '1',
    patterid:     '1',
    setupid:      '1',
    brokerid:     '1',
    
    tppid:        '1',
    cuenta:     'iBroker',
    divisa:     'EUR',
    market:    'Forex',
    ticker:     'EURUSD',
    patron:     'Patron1',
    setup:      'Setup1',
    broker:     'Broker1',
    tpp:        'TPP1',
    status:     'Opened',
    

  };

  constructor(private positionsService: PositionsService, private loggerService: LoggerService) {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0'); // Corregido para obtener el día correcto
  const hour = `${now.getHours()}`.padStart(2, '0');
  const minute = `${now.getMinutes()}`.padStart(2, '0');
  const mydate = `${year}/${month}/${day} ${hour}:${minute}`; // Añadido hora y minutos
    this.formdata.datetimein = mydate;
    this.formdata.datetimeout = mydate;
    this.formdata.creation = mydate;
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
