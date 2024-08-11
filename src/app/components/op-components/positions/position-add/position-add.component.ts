import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { IPositionView } from 'src/app/interfaces/IPosition.interface';
import { IPositionSetup } from 'src/app/interfaces/IPositionSetup.interface';
import { IPositionPattern } from 'src/app/interfaces/IPositionPattern.interface';
import { ITicker } from 'src/app/interfaces/ITicker.interface';
import { ITickerAccount } from 'src/app/interfaces/ITickerAccount.interface';
import { ITpp } from 'src/app/interfaces/ITpp.interface';
import { IAccount } from 'src/app/interfaces/IAccount.interface';

import { PositionsService } from '../../../../services/positions.service';
import { PositionSetupsService } from '../../../../services/position_setups.service';
import { PositionPatternsService, PositionHighPatternsService } from '../../../../services/position_patterns.service';
import { TickerService } from '../../../../services/ticker.service'
import { TickerAccountService } from '../../../../services/tickeraccount.service'
import { TppService } from '../../../../services/tpp.service'
import { AccountsService } from '../../../../services/accounts.service'
import { LoggerService, Tlog } from '../../../../services/logger.service';

import { SharedModule } from 'src/app/shared/shared.module';



@Component({
  selector: 'app-position-add',
  templateUrl: './position-add.component.html',
  styles: [
  ]
})

// --------------------------------------------------------------
// --------------------------------------------------------------
export class PositionAddComponent {
  @ViewChild('input_tppCheck') input_tppCheck!: ElementRef;
  @ViewChild('selectSetup') selectSetup!: ElementRef;
  @ViewChild('selectHighPattern') selectHighPattern!: ElementRef;
  @ViewChild('selectPattern') selectPattern!: ElementRef;
  
  // --------------------------------------------------------------
  // --------------------------------------------------------------

  updaterecord = {
    id: null,
  }

  positionid = 0;

  tpps: Array<ITpp> = [];
  accounts: Array<IAccount> = [];
  tickers: Array<ITicker> = [];
  tickerAccounts: Array<ITickerAccount> = [];
  positionSetups: Array<IPositionSetup> = [];
  positionPatterns: Array<IPositionPattern> = [];
  positionHighPatterns: Array<IPositionPattern> = [];

  curr_ticks: number = 0;
  curr_priceout: number = 0;
  result: number = 0;

  curr_ticker: number = 0;
  curr_tickeraccount_commission: number = 0;
  curr_sessionid: string = "2024-08-09";
  curr_session_usdeur: number = 1;


  
  formdata: IPositionView = {
    id: 0, sessionid: this.curr_sessionid, guid: "", block: "B-2024", blocksecuence: 0,
    creation: "", modification: "",
    timein: "", timeout: "", buysell: "buy", pricein: 0, priceout: 0,
    opresultticks: 81, opresult: 0, contracts: 1, commission: 4.5, opresulteur: 0,
    imagepath: "", status: "",
    divisaid: 0, accountid: 0, tickerid: 0, pattern1id: 0, pattern2id: "not-set", setup1id: 0, setup2id: "m5",
    note: "",  tppid: 0,  tpp: "",  tppcheck: 0,
    deleted: 0, processed: 0,
    divisa:	'', account:'', acctype:'',  ticker:	'',  pattern:	'not-set', setup:	'',
    };

  
   // --------------------------------------------------------------
   // --------------------------------------------------------------

  constructor(private positionsService: PositionsService
    , private positionSetupsService: PositionSetupsService
    , private positionPatternsService: PositionPatternsService
    , private positionHighPatternsService: PositionHighPatternsService
    , private tickerService: TickerService
    , private tickerAccountService: TickerAccountService
    , private tppService: TppService
    , private accountService: AccountsService
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
   

  // async loadTpps(): Promise<ITpp[]> {
    loadTpps() {

  /*
    try{
      const tppsObservable = this.tppService.getAll();
      const tpps: ITpp[] = await lastValueFrom(tppsObservable);
      return tpps;

    }catch (e: any){
      this.loggerService.log(Tlog.error, "tppService.getAll() vía http - http error.");
      this.loggerService.log(Tlog.error, e);
    }
    return [];
  */


      this.tppService.getAll().subscribe({
        complete: () => {
            //this.loggerService.log(Tlog.info, "tppService.getAll() vía http - Ended.");
        },
        next: (data: Array<ITpp>) => {
          this.loggerService.log(Tlog.info, "tppService.getAll() vía http - data:");
          this.loggerService.log(Tlog.info, data);
          this.tpps = data;        
        },
        error: (e: any) => {
          this.loggerService.log(Tlog.error, "tppService.getAll() vía http - http error.");
          this.loggerService.log(Tlog.error, e);
        }
      });
  

  }

  // --------------------------------------------------------------


   loadAccounts(){
    this.accountService.getAll().subscribe({
      complete: () => {
          //this.loggerService.log(Tlog.info, "accountService.getAll() vía http - Ended.");
      },
      next: (data: Array<IAccount>) => {
        this.loggerService.log(Tlog.info, "accountService.getAll() vía http - data:");
        this.loggerService.log(Tlog.info, data);
        this.accounts = data;        
      },
      error: (e: any) => {
        this.loggerService.log(Tlog.error, "accountService.getAll() vía http - http error.");
        this.loggerService.log(Tlog.error, e);
      }
    });
  }



   // combos y selectores
  loadSetups(){
    this.positionSetupsService.getAll().subscribe({
      complete: () => {
          //this.loggerService.log(Tlog.info, "positionSetupsService.getAll() vía http - Ended.");
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
          //this.loggerService.log(Tlog.info, "positionPatternsService.getAll() vía http - Ended.");
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
          //this.loggerService.log(Tlog.info, "positionHighPatternsService.getAll() vía http - Ended.");
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

  loadTickers(){
            this.tickerService.getAll().subscribe({
              complete: () => {
                  //this.loggerService.log(Tlog.info, "tickerService.getAll() vía http - Ended.");
              },
              next: (data: Array<ITicker>) => {
                this.loggerService.log(Tlog.info, "tickerService.getAll() vía http - data:");
                this.loggerService.log(Tlog.info, data);
                this.tickers = data;        
              },
              error: (e: any) => {
                this.loggerService.log(Tlog.error, "tickerService.getAll() vía http - http error.");
                this.loggerService.log(Tlog.error, e);
              }
            });
  }

  loadTickerAccounts(){
    this.tickerAccountService.getAll().subscribe({
      complete: () => {
          //this.loggerService.log(Tlog.info, "tickerAccountService.getAll() vía http - Ended.");
      },
      next: (data: Array<ITickerAccount>) => {
        this.loggerService.log(Tlog.info, "tickerAccountService.getAll() vía http - data:");
        this.loggerService.log(Tlog.info, data);
        this.tickerAccounts = data;        
      },
      error: (e: any) => {
        this.loggerService.log(Tlog.error, "tickerAccountService.getAll() vía http - http error.");
        this.loggerService.log(Tlog.error, e);
      }
    });
  }

  // --------------------------------------------------------------
  // --------------------------------------------------------------

  loadDefaults(){

    // search for default values by default_tppid
    this.loggerService.log(Tlog.info, "this.tpps[0]: ");
    this.loggerService.log(Tlog.info, this.tpps);

    const defaults = {
       "tppid": this.tpps[0]["id"],
      "tpp": this.tpps[0].name,
      "accountid": this.accounts[0].id,
      "account": this.accounts[0].name,
      "ticker": this.tickers[0].name,
      "tickerid": this.tickers[0].id,
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
    this.loadAccounts();  
    
    this.loadTpps();
    /*
    this.loadTpps().then((data: ITpp[]) => {
      this.tpps = data;
    });
*/
    this.loadTickers();
    this.loadTickerAccounts();
    this.loadSetups();
    this.loadPatterns();

    this.loadDefaults();

    // update timeout
    this.updateTimeOut();
    setInterval(() => this.updateTimeOut(), 1000)
  }

  // --------------------------------------------------------------
  // --------------------------------------------------------------

  onSubmit2log(){

    if (!this.validate()){
      return;
    }

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

    // high patterns and patterns
    const selectHighPattern = this.selectHighPattern.nativeElement.options;
    const selectHighPattern_selectedValues = [];
    for (let i = 0; i < selectHighPattern.length; i++) {
      if (selectHighPattern[i].selected) {
        selectHighPattern_selectedValues.push(selectHighPattern[i].value);
      }
    }
    const selectPattern = this.selectPattern.nativeElement.options;
    const selectPattern_selectedValues = [];
    for (let i = 0; i < selectPattern.length; i++) {
      if (selectPattern[i].selected) {
        selectPattern_selectedValues.push(selectPattern[i].value);
      }
    }
    this.formdata.pattern = selectHighPattern_selectedValues.join(',')  + "; " + selectPattern_selectedValues.join(',');

    // temporalidad


    // LOG Form data
    this.loggerService.log(Tlog.info, "FORM formdata:");
    this.loggerService.log(Tlog.info, this.formdata);
  }

  // --------------------------------------------------------------
  // --------------------------------------------------------------

  onSubmit() {

    if (!this.validate()){
      return;
    }

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
      this.router.navigate(['/positions']);
    });
    

  }

  // --------------------------------------------------------------
  // --------------------------------------------------------------

  updateTimeOut(): void {  
    this.formdata.timeout = this.sharedModule.getTime();
  }

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
    this.router.navigate(['/positions']);
  }


  // --------------------------------------------------------------
  // --------------------------------------------------------------

  validate(){
    let errors = [];
    if (this.formdata.pricein == 0){
      errors.push("PriceIn is required");
    }
    if (this.formdata.priceout == 0){
      errors.push("PriceOut is required");
    }
    if (this.formdata.contracts == 0){
      errors.push("Contracts is required");
    }
    if (this.formdata.pattern1id == 0){
      errors.push("Pattern1 is required");
    }
    if (this.formdata.setup1id == 0){
      errors.push("Setup1 is required");
    }
    if (this.formdata.pattern2id.toLowerCase() == "not-set"){
      errors.push("Pattern2 is required");
    }
    if (this.formdata.setup2id.toLowerCase() == "not-set"){
      errors.push("Setup2 is required");
    }
    if (errors.length > 0){
      this.loggerService.log(Tlog.error, "Validation errors:");
      this.loggerService.log(Tlog.error, errors);
      return false;
    }
    return true;
  }
}