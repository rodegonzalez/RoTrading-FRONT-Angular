import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';


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

// --------------------------------------------------------------
// --------------------------------------------------------------
export class OpPanelNewOperationComponent {
  

  @ViewChild('input_tppCheck') input_tppCheck!: ElementRef;
  @ViewChild('input_isrealCheck') input_isrealCheck!: ElementRef;
  @ViewChild('selectSetup') selectSetup!: ElementRef;
  @ViewChild('selectHighPattern') selectHighPattern!: ElementRef;
  
  


  // --------------------------------------------------------------
  // --------------------------------------------------------------

  updaterecord = {
    id: null,
  }

  positionid = 0;

  positionSetups: Array<IPositionSetup> = [];
  positionPatterns: Array<IPositionPattern> = [];
  positionHighPatterns: Array<IPositionPattern> = [];

  
  formdata: IPositionView = {
    block: "",
    creation: "",
    modification: "",
    datetimein: "",
    datetimeout: "",
    buysell: "",
    pricein: 0,
    priceout: 0,
    ticks: 0,
    profit: 0,
    stoploss: 0,
    contracts: 0,
    commision: 0,
    euros: 0,
    dollareuro: 0,
    imagepath: "",
    status: "",
    divisaid: 0,
    accountid: 0,
    marketid: 0,
    tickerid: 0,
    patternid: 0,
    setupid: 0,
    brokerid: 0,
    isrealCheck: 0,
    tppCheck: 0,
    note: "",
    temporal: "",
    tppid: 0,
    tpp: "",
    active: 0,
    deleted: 0,
    processed: 0,
    divisa:			'',
    account:		'',
    market:			'',
    ticker:			'',
    pattern:		'',
    setup:			'',
    broker:			'',
    acctype:		'',
  };

  
   // --------------------------------------------------------------
   // --------------------------------------------------------------

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

    //--------------------------------
    this.positionHighPatterns = [
      {
          id: 1,
          creation: "2021/01/01",
          modification: "2021/01/01",
          name: "A Tipo 1",
          description: "pattern 1 description",
          status: "active",
          note: "note",
          active: 1,
          deleted: 0
      },
      {
        id: 2,
        creation: "2021/01/01",
        modification: "2021/01/01",
        name: "A Tipo 2",
        description: "pattern 2 description",
        status: "active",
        note: "note",
        active: 1,
        deleted: 0
    },
    {
      id: 3,
      creation: "2021/01/01",
      modification: "2021/01/01",
      name: "B Tipo 1",
      description: "pattern 3 description",
      status: "active",
      note: "note",
      active: 1,
      deleted: 0
  },
    ];
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

  onSubmit3(){
    this.loggerService.log(Tlog.info, "contenido de formData: ");
    this.loggerService.log(Tlog.info, this.formdata);

    this.loggerService.log(Tlog.info, "this.formdata.tppCheck: ");
    this.loggerService.log(Tlog.info, this.formdata.tppCheck);
    this.loggerService.log(Tlog.info, (this.formdata.tppCheck) ? 1 : 0);

    this.loggerService.log(Tlog.info, "this.input_tppCheck.nativeElement.checked: ");
    this.loggerService.log(Tlog.info, this.input_tppCheck.nativeElement.checked);

    this.loggerService.log(Tlog.info, "this.input_isrealCheck.nativeElement.checked: ");
    this.loggerService.log(Tlog.info, this.input_isrealCheck.nativeElement.checked);

    this.loggerService.log(Tlog.info, "this.select_setup.nativeElement.checked: ");
    const options = this.selectSetup.nativeElement.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    this.loggerService.log(Tlog.info, selectedValues.join(','));

    this.loggerService.log(Tlog.info, "this.selectHighPattern.nativeElement.checked: ");
    const optionsHP = this.selectHighPattern.nativeElement.options;
    const selectedValuesHP = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValuesHP.push(options[i].value);
      }
    }
    const highpattern = (selectedValuesHP.length>0)?selectedValuesHP.join(' ') + ' ':'';
    this.formdata.pattern = highpattern  + this.formdata.pattern;


    this.loggerService.log(Tlog.info, this.formdata);
  }

  onSubmit2(){
        //this.idaccount = data.idaccount;
        const mydate = this.getDate();
        this.formdata.creation = mydate;
        this.formdata.modification = mydate;
        this.formdata.active = 1;
        this.formdata.deleted = 0;
        this.formdata.processed = 0;
        this.formdata.status = "opened";
    
        //TODO: fix this
        this.formdata.brokerid = 1;
        this.formdata.brokerid = 1;
        
        this.formdata.buysell = this.formdata.buysell.toLowerCase() == "buy" ? 'buy' : 'sell';
    
        this.formdata.tppCheck = this.input_tppCheck.nativeElement.checked ? 1 : 0;
        this.formdata.isrealCheck = this.input_isrealCheck.nativeElement.checked ? 1 : 0;
    
        const options = this.selectSetup.nativeElement.options;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            selectedValues.push(options[i].value);
          }
        }
        //this.formdata.setup = (selectedValues.length>0)?selectedValues.join(' '):'';
        this.formdata.setup = selectedValues.join(',');

        const optionsHP = this.selectHighPattern.nativeElement.options;
        const selectedValuesHP = [];
        for (let i = 0; i < optionsHP.length; i++) {
          if (optionsHP[i].selected) {
            selectedValuesHP.push(optionsHP[i].value);
          }
        }
        const highpattern = (selectedValuesHP.length>0)?selectedValuesHP.join(',') + '; ':'';
        this.formdata.pattern = highpattern  + this.formdata.pattern;


        this.loggerService.log(Tlog.info, "FORM formdata:");
        this.loggerService.log(Tlog.info, this.formdata);
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
    this.formdata.status = "opened";

    //TODO: fix this
    this.formdata.brokerid = 1;
    this.formdata.brokerid = 1;
    
    this.formdata.buysell = this.formdata.buysell.toLowerCase() == "buy" ? 'buy' : 'sell';

    this.formdata.tppCheck = this.input_tppCheck.nativeElement.checked ? 1 : 0;
    this.formdata.isrealCheck = this.input_isrealCheck.nativeElement.checked ? 1 : 0;

    const options = this.selectSetup.nativeElement.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    this.formdata.setup = selectedValues.join(',');

    const optionsHP = this.selectHighPattern.nativeElement.options;
    const selectedValuesHP = [];
    for (let i = 0; i < optionsHP.length; i++) {
      if (optionsHP[i].selected) {
        selectedValuesHP.push(optionsHP[i].value);
      }
    }
    const highpattern = (selectedValuesHP.length>0)?selectedValuesHP.join(',') + '; ':'';
    this.formdata.pattern = highpattern  + this.formdata.pattern;


    this.loggerService.log(Tlog.info, "FORM formdata:");
    this.loggerService.log(Tlog.info, this.formdata);

    let response : any = this.positionsService.savePositionForm(this.formdata);
    this.loggerService.log(Tlog.info, "FORM updaterecord response:");
    this.loggerService.log(Tlog.info,response);
  }




  }



