import { Component, OnInit } from '@angular/core';


import { FormGroup } from '@angular/forms';
import { IPositionView } from 'src/app/interfaces/IPosition.interface';
import { IPositionSetup } from 'src/app/interfaces/IPositionSetup.interface';
import { IPositionPattern } from 'src/app/interfaces/IPositionPattern.interface';

import { PositionsService } from '../../../../services/positions.service';
import { PositionSetupsService } from '../../../../services/position_setups.service';
import { PositionPatternsService } from '../../../../services/position_patterns.service';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-op-panel-new-operation',
  templateUrl: './op-panel-new-operation.component.html',
  styles: [
  ]
})
export class OpPanelNewOperationComponent {
  
  updaterecord = {
    id: null,
  }

  mytppcheck=1;
  myisrealcheck = 0;

  positionSetups: Array<IPositionSetup> = [];
  positionPatterns: Array<IPositionPattern> = [];

  
  formdata = {
    //id: null,
    accountid:  1,
    block:      'B001',
    creation:   '2021-01-01',
    modification:   '2021-01-01',

    datetimein:     '00:00',
    datetimeout:     '00:00',
    pricein:    0.0,
    priceout:    0.0,
    contracts:  1,
    profit:     80,
    stoploss:   -20,
    commision: 4.5,
    tppCheck:   1,
    isrealCheck: 1,
    temporal:   'm5',
    note:       '',
    
    divisaid:     1,
    marketid:     1,
    tickerid:     1,
    patternid:    1,
    setupid:      1,
    brokerid:     1,
    tppid:        1,

    account:     'iBroker',
    divisa:     'EUR',
    market:    'Forex',
    ticker:     'EURUSD',
    pattern:     'Patron1',
    setup:      'Setup1',
    broker:     'Broker1',
    tpp:        'TPP1',
    status:     'opened',
    active:     1,
    deleted:    0,

    processed:  0,
    
    buysell: 'buy',
    euros: 1000,
    dollareuro: 1.2,
    ticks: 100,
    imagepath: '',
    acctype: 'real',


  };

  constructor(private positionsService: PositionsService
    , private positionSetupsService: PositionSetupsService
    , private positionPatternsService: PositionPatternsService
    , private loggerService: LoggerService) 
  {
    const mydate = this.getDate();
    this.formdata.datetimein = mydate;
    this.formdata.datetimeout = mydate;
    this.formdata.creation = mydate;
   }



   // --------------------------------------------------------------
   // --------------------------------------------------------------

     // Auxiliar
  getDate(){
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0'); // Corregido para obtener el día correcto
    const hour = `${now.getHours()}`.padStart(2, '0');
    const minute = `${now.getMinutes()}`.padStart(2, '0');
    return `${year}/${month}/${day} ${hour}:${minute}`; // Añadido hora y minutos
   }

     // combos y selectores
  loadSetups(){
    this.positionSetupsService.getAll().subscribe({
      complete: () => {
          this.loggerService.log(Tlog.info, "positionSetupsService.getAll() vía http - Ended.");
      },
      next: (data: Array<IPositionSetup>) => {
        this.loggerService.log(Tlog.info, "positionSetupsService.getAll() vía http - data:");
        this.loggerService.log(Tlog.info, data);
        this.positionSetups = data;        
      },
      error: (e: any) => {
        this.loggerService.log(Tlog.error, "positionSetupsService.getAll() vía http - http error.");
        this.loggerService.log(Tlog.error, e);
      }
    });
  }

  // --------------------------------------------------------------
  // --------------------------------------------------------------

  loadPatterns(){
    this.positionPatternsService.getAll().subscribe({
      complete: () => {
          this.loggerService.log(Tlog.info, "positionPatternsService.getAll() vía http - Ended.");
      },
      next: (data: Array<IPositionPattern>) => {
        this.loggerService.log(Tlog.info, "positionPatternsService.getAll() vía http - data:");
        this.loggerService.log(Tlog.info, data);
        this.positionPatterns = data;        
      },
      error: (e: any) => {
        this.loggerService.log(Tlog.error, "positionPatternsService.getAll() vía http - http error.");
        this.loggerService.log(Tlog.error, e);
      }
    });
  }

  loadBrokers(){}
  loadTickers(){}

  // --------------------------------------------------------------
  // --------------------------------------------------------------

  ngOnInit(){    
    this.loadSetups();
    this.loadPatterns();
    this.loadBrokers();
    this.loadTickers();

  }

  // --------------------------------------------------------------
  // --------------------------------------------------------------

  onSubmit2(){
    this.loggerService.log(Tlog.info, "contenido de formData: ");
    this.loggerService.log(Tlog.info, this.formdata);

    this.loggerService.log(Tlog.info, "this.formdata.tppCheck: ");
    this.loggerService.log(Tlog.info, this.formdata.tppCheck);
    this.loggerService.log(Tlog.info, (this.formdata.tppCheck) ? 1 : 0);

    this.loggerService.log(Tlog.info, "this.formdata.isrealCheck: ");
    this.loggerService.log(Tlog.info, this.formdata.isrealCheck);
    
  }

  // --------------------------------------------------------------
  // --------------------------------------------------------------

  onSubmit() {



    this.loggerService.log(Tlog.info, "contenido de formData: ");
    this.loggerService.log(Tlog.info, this.formdata);

    //this.idaccount = data.idaccount;
    const mydate = this.getDate();
    this.formdata.creation = mydate;
    this.formdata.modification = mydate;
    this.formdata.active = 1;
    this.formdata.deleted = 0;
    this.formdata.processed = 0;

    //TODO: fix this
    this.formdata.brokerid = 1;
    this.formdata.brokerid = 1;
    
    //data.tppCheck =  data.tppChecked == true ? '1' : '0';
    //data.isrealcheck = data.isrealChecked == true ? '1' : '0';
    this.formdata.buysell = this.formdata.buysell == "buy" ? 'buy' : 'sell';

    this.loggerService.log(Tlog.info, "FORM formdata:");
    this.loggerService.log(Tlog.info, this.formdata);

    let response : any = this.positionsService.savePositionForm(this.formdata);
    this.loggerService.log(Tlog.info, "FORM updaterecord response:");
    this.loggerService.log(Tlog.info,response);
  }




  }



