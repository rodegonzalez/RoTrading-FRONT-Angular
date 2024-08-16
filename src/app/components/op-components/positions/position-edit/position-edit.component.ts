import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';


import { FormGroup } from '@angular/forms';
import { IPositionView } from 'src/app/interfaces/IPosition.interface';
import { IPositionSetup } from 'src/app/interfaces/IPositionSetup.interface';
import { IPositionPattern } from 'src/app/interfaces/IPositionPattern.interface';

import { PositionsService } from '../../../../services/positions.service';
import { PositionSetupsService } from '../../../../services/position_setups.service';
import { PositionPatternsService, PositionHighPatternsService } from '../../../../services/position_patterns.service';
import { LoggerService, Tlog } from '../../../../services/logger.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-position-edit',
  templateUrl: './position-edit.component.html',
  styles: [
  ]
})

// --------------------------------------------------------------
// --------------------------------------------------------------
export class PositionEditComponent {
  

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

  curr_ticks: number = 0;
  curr_priceout: number = 0;
  result: number = 0;
  
  formdata: IPositionView = {
    id: 0,
    sessionid: "20240809",
    guid: "",
    tppblocksec: 0,
    sec: 0,
    creation: "",
    modification: "",
    timein: "",
    timeout: "",
    buysell: "buy",
    pricein: 0,
    priceout: 0,
    opresultticks: 81,
    opresult: 0,
    contracts: 1,
    commission: 4.5,
    opresulteur: 0,
    usdeur: 0.92,
    imagepath: "",
    status: "",
    divisaid: 0,
    accountid: 0,
    tickerid: 0,
    pattern1id: 0,
    pattern2id: "Not-set",
    setup1id: 0,
    setup2id: "m5",
    note: "",
    tppid: 0,
    tpp: "",
    tppcheck: 0,
    deleted: 0,
    processed: 0,
    divisa:			'',
    account:		'',
    acctype:		'',
    ticker:			'',
    pattern:		'Not-set',
    setup:			'',

  };

  
   // --------------------------------------------------------------
   // --------------------------------------------------------------

  constructor(private positionsService: PositionsService
    , private positionSetupsService: PositionSetupsService
    , private positionPatternsService: PositionPatternsService
    , private positionHighPatternsService: PositionHighPatternsService
    , private loggerService: LoggerService
    , private router: Router
    , private sharedModule: SharedModule) 
  {
    const mydate = this.sharedModule.getTime();
    this.formdata.timein = mydate;
    this.formdata.timeout = mydate;
    this.formdata.creation = mydate;
   }



   // --------------------------------------------------------------
   // --------------------------------------------------------------

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

    // Patterns
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


    // High Patterns
    this.positionHighPatternsService.getAll().subscribe({
      complete: () => {
          this.loggerService.log(Tlog.info, "positionHighPatternsService.getAll() vía http - Ended.");
      },
      next: (data: Array<IPositionPattern>) => {
        this.loggerService.log(Tlog.info, "positionHighPatternsService.getAll() vía http - data:");
        this.loggerService.log(Tlog.info, data);
        this.positionHighPatterns = data;        
      },
      error: (e: any) => {
        this.loggerService.log(Tlog.error, "positionHighPatternsService.getAll() vía http - http error.");
        this.loggerService.log(Tlog.error, e);
      }
    });

  }

  loadTickers(){}

  // --------------------------------------------------------------
  // --------------------------------------------------------------

  loadDefaults(){

    // search for default values by default_tppid
    const defaults = {
      "tppid": 1,
      "tpp": "TPP2024",
      "accountid": 1,
      "account": "A0045679 (iBroker)",
      "brokerid":1,
      "broker": "",
      "ticker": "MCL (NYMEX)",
      "tickerid": 1,
      "dollareuro": 1.0005,      
      "pattern1id": 1,
      "setup1id": 1,
      "divisa": "USD",
      "divisaid": 1,
      
    }

    const default_tppid: number = 1;

    this.formdata.timein = this.sharedModule.getTime();
    this.formdata.accountid = defaults.accountid;
    this.formdata.account = defaults.account;
    this.formdata.tickerid = defaults.tickerid;
    this.formdata.ticker = defaults.ticker;    
    this.formdata.tppid = defaults.tppid;
    this.formdata.tpp = defaults.tpp;
    this.formdata.pattern1id = defaults.pattern1id;
    this.formdata.pattern2id = "Not-set";
    this.formdata.setup1id = defaults.setup1id;
    this.formdata.setup2id = "m5";
    this.formdata.divisaid = defaults.divisaid;
    this.formdata.divisa = defaults.divisa;
  }

  ngOnInit(){    
    this.loadSetups();
    this.loadPatterns();
    this.loadTickers();
    this.loadDefaults();
  }

  // --------------------------------------------------------------
  // --------------------------------------------------------------

  /*
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
  */

  onSubmit2(){
        //this.idaccount = data.idaccount;
        const mydate = this.sharedModule.getDateTime();
        this.formdata.creation = mydate;
        this.formdata.modification = mydate;
        this.formdata.deleted = 0;
        this.formdata.processed = 0;
        this.formdata.status = "opened";
        
        this.formdata.buysell = this.formdata.buysell.toLowerCase() == "buy" ? 'buy' : 'sell';
    
        this.formdata.tppcheck = this.input_tppCheck.nativeElement.checked ? 1 : 0;
    
        // setups
        const options = this.selectSetup.nativeElement.options;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            selectedValues.push(options[i].value);
          }
        }
        this.formdata.setup = selectedValues.join(',');

        // high patterns
        const optionsHP = this.selectHighPattern.nativeElement.options;
        const selectedValuesHP = [];
        for (let i = 0; i < optionsHP.length; i++) {
          if (optionsHP[i].selected) {
            selectedValuesHP.push(optionsHP[i].value);
          }
        }
        const highpattern = (selectedValuesHP.length>0)?selectedValuesHP.join(',') + '; ':'';
        this.formdata.pattern = highpattern  + this.formdata.pattern;

        // LOG Form data
        this.loggerService.log(Tlog.info, "FORM formdata:");
        this.loggerService.log(Tlog.info, this.formdata);
  }

  // --------------------------------------------------------------
  // --------------------------------------------------------------

  onSubmit() {



    this.loggerService.log(Tlog.info, "contenido de formData: ");
    this.loggerService.log(Tlog.info, this.formdata);

    //this.idaccount = data.idaccount;
    const mydate = this.sharedModule.getDateTime();
    this.formdata.creation = mydate;
    this.formdata.modification = mydate;
    this.formdata.deleted = 0;
    this.formdata.processed = 0;
    this.formdata.status = "opened";
    
    this.formdata.buysell = this.formdata.buysell.toLowerCase() == "buy" ? 'buy' : 'sell';

    this.formdata.tppcheck = this.input_tppCheck.nativeElement.checked ? 1 : 0;

     // setups
    const options = this.selectSetup.nativeElement.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    this.formdata.setup = selectedValues.join(',');

    // high patterns
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

    // reload panel
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/posiciones']);
    });
    

  }

  // --------------------------------------------------------------
  // --------------------------------------------------------------

  priceOutChanged(event: any){
    this.loggerService.log(Tlog.info, "PriceOut changed: ");
    this.curr_ticks = this.curr_ticks + 50;
    this.formdata.opresultticks = this.curr_ticks;
    this.formdata.priceout = this.curr_priceout;
  }

  ticksChanged(event: any){
    this.loggerService.log(Tlog.info, "Ticks changed: ");
    this.curr_priceout = this.formdata.priceout + 50;
    this.formdata.opresultticks = this.curr_ticks;
    this.formdata.priceout = this.curr_priceout;
  }

  // --------------------------------------------------------------
  // --------------------------------------------------------------

  onBack(){
    this.router.navigate(['/posiciones']);
  }


  // --------------------------------------------------------------
  // --------------------------------------------------------------

}