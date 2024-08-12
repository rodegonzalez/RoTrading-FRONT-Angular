import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Decimal } from 'decimal.js';

import { FormGroup } from '@angular/forms';
import { IPositionView } from 'src/app/interfaces/IPosition.interface';
import { IPositionSetup } from 'src/app/interfaces/IPositionSetup.interface';
import { IPositionHighPattern, IPositionPattern } from 'src/app/interfaces/IPositionPattern.interface';
import { ITicker } from 'src/app/interfaces/ITicker.interface';
import { ITickerAccount } from 'src/app/interfaces/ITickerAccount.interface';
import { ITpp } from 'src/app/interfaces/ITpp.interface';
import { IAccount } from 'src/app/interfaces/IAccount.interface';
import { IDivisa } from 'src/app/interfaces/IDivisa.interface';

import { PositionsService } from '../../../../services/positions.service';
import { PositionSetupsService } from '../../../../services/position_setups.service';
import { PositionPatternsService, PositionHighPatternsService } from '../../../../services/position_patterns.service';
import { TickerService } from '../../../../services/ticker.service';
import { TickerAccountService } from '../../../../services/tickeraccount.service';
import { TppService } from '../../../../services/tpp.service';
import { AccountsService } from '../../../../services/accounts.service';
import { DivisaService } from '../../../../services/divisa.service';
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
  @ViewChild('selectAccount') selectAccount!: ElementRef;
  
  // --------------------------------------------------------------
  // --------------------------------------------------------------

  updaterecord = {
    id: null,
  }

  positionid = 0;

  tpps: Array<ITpp> = [];
  divisas: Array<IDivisa> = [];
  accounts: Array<IAccount> = [];
  tickers: Array<ITicker> = [];
  tickerAccounts: Array<ITickerAccount> = [];
  positionSetups: Array<IPositionSetup> = [];
  positionPatterns: Array<IPositionPattern> = [];
  positionHighPatterns: Array<IPositionPattern> = [];

  // --------------------------------------------------------------

  // force update form
  curr_account_or_ticker_changed: boolean = true;
  
  curr_account_id: number = 1;
  curr_account_name: string = "";
  curr_ticker_id: number = 1;
  curr_ticker_name: string = "";
  curr_tpp_id: number = 1;
  curr_tpp_name: string = "";



  // --------------------------------------------------------------
  curr_ticks: number = 0;
  curr_priceout: number = 0;
  result: number = 0;



  curr_tickeraccount_commission: number = 0;
  curr_sessionid: string = this.sharedModule.getSessionid();
  curr_session_usdeur: number = 0.92;
  

  
  formdata: IPositionView = {
    id: 0, sessionid: this.curr_sessionid, guid: "", block: "B-2024", blocksecuence: 0,
    creation: "", modification: "",
    timein: "", timeout: "", buysell: "buy", pricein: 0, priceout: 0,
    opresultticks: 0, opresult: 0, contracts: 1, commission: 4.5, opresulteur: 0,
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
    , private divisaService: DivisaService
    , private loggerService: LoggerService
    , private router: Router
    , private sharedModule: SharedModule) { }


   // --------------------------------------------------------------
   // --------------------------------------------------------------
   
  loadDivisasAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
          this.divisaService.getAll().subscribe({
            complete: () => {
                resolve();
            },
            next: (data: Array<IDivisa>) => {
              this.divisas = data;        
            },
            error: (e: any) => {
              this.loggerService.log(Tlog.error, "loadDivisasAsync error:");
              this.loggerService.log(Tlog.error, e);
              reject(e);
            }
          });
    });
  }

  loadAccountsAsync(): Promise<void> {
          return new Promise((resolve, reject) => {
                this.accountService.getAll().subscribe({
                  complete: () => {
                      resolve();
                  },
                  next: (data: Array<IAccount>) => {
                    this.accounts = data;        
                  },
                  error: (e: any) => {
                    this.loggerService.log(Tlog.error, "loadAccountsAsync error:");
                    this.loggerService.log(Tlog.error, e);
                    reject(e);
                  }
                });
          });
  }

  loadTppsAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
          this.tppService.getAll().subscribe({
            complete: () => {
                resolve();
            },
            next: (data: Array<ITpp>) => {
              this.tpps = data;        
            },
            error: (e: any) => {
              this.loggerService.log(Tlog.error, "loadTppsAsync error:");
              this.loggerService.log(Tlog.error, e);
              reject(e);
            }
          });
    });
  }

  loadSetupsAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
          this.positionSetupsService.getAll().subscribe({
            complete: () => {
                resolve();
            },
            next: (data: Array<IPositionSetup>) => {
              this.positionSetups = data;        
            },
            error: (e: any) => {
              this.loggerService.log(Tlog.error, "loadSetupsAsync error:");
              this.loggerService.log(Tlog.error, e);
              reject(e);
            }
          });
    });
  }

  loadHighPatternsAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
          this.positionHighPatternsService.getAll().subscribe({
            complete: () => {
                resolve();
            },
            next: (data: Array<IPositionHighPattern>) => {
              this.positionHighPatterns = data;        
            },
            error: (e: any) => {
              this.loggerService.log(Tlog.error, "loadHighPatternsAsync error:");
              this.loggerService.log(Tlog.error, e);
              reject(e);
            }
          });
    });
  }

  loadPatternsAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
          this.positionPatternsService.getAll().subscribe({
            complete: () => {
                resolve();
            },
            next: (data: Array<IPositionPattern>) => {
              this.positionPatterns = data;        
            },
            error: (e: any) => {
              this.loggerService.log(Tlog.error, "loadPatternsAsync error:");
              this.loggerService.log(Tlog.error, e);
              reject(e);
            }
          });
    });
  }

  loadTickersAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
          this.tickerService.getAll().subscribe({
            complete: () => {
                resolve();
            },
            next: (data: Array<ITicker>) => {
              this.tickers = data;        
            },
            error: (e: any) => {
              this.loggerService.log(Tlog.error, "loadTickersAsync error:");
              this.loggerService.log(Tlog.error, e);
              reject(e);
            }
          });
    });
  }

  loadTickerAccountsAsync(): Promise<void> {
    return new Promise((resolve, reject) => {
          this.tickerAccountService.getAll().subscribe({
            complete: () => {
                resolve();
            },
            next: (data: Array<ITickerAccount>) => {
              this.tickerAccounts = data;        
            },
            error: (e: any) => {
              this.loggerService.log(Tlog.error, "loadTickerAccountsAsync error:");
              this.loggerService.log(Tlog.error, e);
              reject(e);
            }
          });
    });
  }

  async loadDataAsync(): Promise<void> {
    await this.loadDivisasAsync();
    await this.loadTppsAsync();
    await this.loadAccountsAsync();
    await this.loadSetupsAsync();
    await this.loadPatternsAsync();
    await this.loadHighPatternsAsync();
    await this.loadTickersAsync();
    await this.loadTickerAccountsAsync();
  }

  // load data after async methods
  loadDefaultData(){
    const mydate = this.sharedModule.getTime();
    this.formdata.timein = mydate;
    this.formdata.timeout = mydate;
    this.formdata.creation = mydate;
    this.formdata.timein = this.sharedModule.getTime();
    this.formdata.accountid = this.accounts[0].id;
    this.formdata.account = this.accounts[0].name;
    this.formdata.tickerid = this.tickers[0].id;
    this.formdata.ticker = this.tickers[0].name;    
    this.formdata.tppid = this.tpps[0].id;
    this.formdata.tpp = this.tpps[0].name;
    this.formdata.pattern1id = this.positionHighPatterns[0].id;
    this.formdata.pattern2id = "Not-set";
    this.formdata.setup1id = this.positionPatterns[0].id;
    this.formdata.setup2id = "m5";
    this.formdata.divisaid = this.divisas[0].id;
    this.formdata.divisa = this.divisas[0].name;
    this.formdata.commission = this.tickerAccounts[0].commission;

  }

   // --------------------------------------------------------------
   // --------------------------------------------------------------

  ngOnInit(){  
    // load data
    this.loadDataAsync().then(() => {

      // after async... do it!
      this.loggerService.log(Tlog.info, "Todas las funciones de carga completadas.");
      this.loadDefaultData();

      // update form after load data
      this.curr_account_name = this.accounts.find(x => x.id == this.curr_account_id)?.name || "";
      this.curr_ticker_name = this.tickers.find(x => x.id == this.curr_ticker_id)?.name || "";
      this.curr_tpp_name = this.tpps.find(x => x.id == this.curr_tpp_id)?.name || "";
      this.curr_account_or_ticker_changed = true;
      this.updateCurrForm();

      // log for testing
      /*
      this.loggerService.log(Tlog.info, "PositionAddComponent initialized");
      this.loggerService.log(Tlog.info, "Tickers:");
      this.loggerService.log(Tlog.info, this.tickers);
      */
      
    }).catch((error) => {
      this.loggerService.log(Tlog.error, "Error en la carga de datos:");
      this.loggerService.log(Tlog.error, error);
    });

    

    // update timeouts
    this.updateTimeOut();
    setInterval(() => this.updateTimeOut(), 1000);


  }

  // --------------------------------------------------------------
  // Submits and redirections
  // --------------------------------------------------------------

  onBack(){
    this.router.navigate(['/positions']);
  }

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
  // Validation
  // --------------------------------------------------------------

  validate(){
    let errors = [];
    /*
    if (this.formdata.pricein == 0){
      errors.push("PriceIn is required");
    }
    if (this.formdata.priceout == 0){
      errors.push("PriceOut is required");
    }
    */
    if (this.formdata.contracts == 0){
      errors.push("Contracts is required");
    }

    const selectedHighPatternValue = this.selectHighPattern.nativeElement.value;
    if (selectedHighPatternValue.toLowerCase() == "not-set"){
      errors.push("High pattern is required");
    }
    const selectedPatternValue = this.selectPattern.nativeElement.value;
    if (selectedPatternValue.toLowerCase() == "not-set"){
      errors.push("Pattern is required");
    }

    /*
    if (this.formdata.setup1id == 0){
      errors.push("Setup1 is required");
    } 
    */  
    const selectedSetupValue = this.selectSetup.nativeElement.value; 
    if (selectedSetupValue.toLowerCase() == "not-set"){
      errors.push("Setup is required");
    }

    if (errors.length > 0){
      this.loggerService.log(Tlog.error, "Validation errors:");
      this.loggerService.log(Tlog.error, errors);
      return false;
    }
    return true;
  }

  // --------------------------------------------------------------
  // Time intervals
  // --------------------------------------------------------------

  updateTimeOut(): void {  
    this.formdata.timeout = this.sharedModule.getTime();
  }

  // --------------------------------------------------------------
  // Form controls changes
  // --------------------------------------------------------------

  priceOutChanged(){
    const ticker = this.tickers.find(x => x.id == this.curr_ticker_id) || { tickmin: 0, tickminvalue: 0 };
    const pricein = new Decimal(this.formdata.pricein);
    const priceout = new Decimal(this.formdata.priceout);
    const contracts = new Decimal(this.formdata.contracts);
    const commission = new Decimal(this.formdata.commission);
    const buysell = (this.formdata.buysell.toLowerCase() == "buy") ? new Decimal(1) : new Decimal(-1);
    const diff = priceout.minus(pricein).times(buysell);
    const resultticks = diff.dividedBy(ticker.tickmin);
    const result = resultticks.times(contracts).times(ticker.tickminvalue).minus(commission);
    const resulteur = result.times(this.curr_session_usdeur);
    this.formdata.opresultticks = resultticks.toNumber();
    this.formdata.opresult = result.toNumber();
    this.formdata.opresulteur = resulteur.toNumber();
  
    /*
    this.loggerService.log(Tlog.info, "PriceOut changed: ");
    this.loggerService.log(Tlog.info, "USDEUR: " + this.curr_session_usdeur);
    this.loggerService.log(Tlog.info, "this.curr_ticker_id: " + this.curr_ticker_id);
    this.loggerService.log(Tlog.info, "tickmin: " + ticker.tickmin);
    this.loggerService.log(Tlog.info, "tickminvalue: " + ticker.tickminvalue);
    this.loggerService.log(Tlog.info, "PriceIN: " + pricein.toString());
    this.loggerService.log(Tlog.info, "PriceOUT: " + priceout.toString());
    this.loggerService.log(Tlog.info, "Diff: " + diff.toString());
    this.loggerService.log(Tlog.info, "Contracts: " + contracts.toString());
    this.loggerService.log(Tlog.info, "Commission: " + commission.toString());
    this.loggerService.log(Tlog.info, "ResultTicks: " + resultticks.toString());
    this.loggerService.log(Tlog.info, "Result: " + result.toString());
    this.loggerService.log(Tlog.info, "ResultEUR: " + resulteur.toString());
    */
  }

  priceInChanged(){    
    const ticker = this.tickers.find(x => x.id == this.curr_ticker_id) || { tickmin: 0, tickminvalue: 0 };
    const maxdecimals = new Decimal(this.sharedModule.countDecimalDigits(ticker.tickmin));
    const pricein = new Decimal(this.formdata.pricein).toDecimalPlaces(maxdecimals.toNumber());
    this.formdata.pricein = pricein.toNumber();
    this.priceOutChanged(); 
  }

  ticksChanged(){
    const ticker = this.tickers.find(x => x.id == this.curr_ticker_id) || { tickmin: 0, tickminvalue: 0 };
    const maxdecimals = new Decimal(this.sharedModule.countDecimalDigits(ticker.tickmin));
    const resultticks = new Decimal(this.formdata.opresultticks).toDecimalPlaces(0);
    const pricein = new Decimal(this.formdata.pricein);
    const priceout = pricein.add(resultticks).times(ticker.tickmin).toDecimalPlaces(maxdecimals.toNumber());
    const contracts = new Decimal(this.formdata.contracts);
    const commission = new Decimal(this.formdata.commission);
    const buysell = (this.formdata.buysell.toLowerCase() == "buy") ? new Decimal(1) : new Decimal(-1);
    const diff = priceout.minus(pricein).times(buysell);
    const result = resultticks.times(contracts).times(ticker.tickminvalue).minus(commission);
    const resulteur = result.times(this.curr_session_usdeur);
    this.formdata.priceout = diff.toNumber();
    this.formdata.opresultticks = resultticks.toNumber();
    this.formdata.opresult = result.toNumber();
    this.formdata.opresulteur = resulteur.toNumber();

    /*
    this.loggerService.log(Tlog.info, "Ticks changed: ");
    this.loggerService.log(Tlog.info, "USDEUR: " + this.curr_session_usdeur);
    this.loggerService.log(Tlog.info, "this.curr_ticker_id: " + this.curr_ticker_id);
    this.loggerService.log(Tlog.info, "tickmin: " + ticker.tickmin);
    this.loggerService.log(Tlog.info, "maxdecimals: " + maxdecimals);
    this.loggerService.log(Tlog.info, "tickminvalue: " + ticker.tickminvalue);
    this.loggerService.log(Tlog.info, "PriceIN: " + pricein.toString());
    this.loggerService.log(Tlog.info, "PriceOUT: " + priceout.toString());
    this.loggerService.log(Tlog.info, "Diff: " + diff.toString());
    this.loggerService.log(Tlog.info, "Contracts: " + contracts.toString());
    this.loggerService.log(Tlog.info, "Commission: " + commission.toString());
    this.loggerService.log(Tlog.info, "ResultTicks: " + resultticks.toString());
    this.loggerService.log(Tlog.info, "Result: " + result.toString());
    this.loggerService.log(Tlog.info, "ResultEUR: " + resulteur.toString());
    */
  }

  selectAccountChanged(event: any){   
    /*
    this.loggerService.log(Tlog.info, "Account changed to: ");
    this.loggerService.log(Tlog.info, selectedOption.value);
    this.loggerService.log(Tlog.info, selectedOption.text);
    */
    const selectedOption = event.target.options[event.target.selectedIndex];
    this.curr_account_id = selectedOption.value;
    this.curr_account_name = selectedOption.text;
    this.curr_account_or_ticker_changed = true;
    this.updateCurrForm();
  }

  selectTickerChanged(event: any){    
    /*
    this.loggerService.log(Tlog.info, "Account changed to: ");
    this.loggerService.log(Tlog.info, selectedOption.value);
    this.loggerService.log(Tlog.info, selectedOption.text);
    */
    const selectedOption = event.target.options[event.target.selectedIndex];
    this.curr_ticker_id = selectedOption.value;
    this.curr_ticker_name = selectedOption.text;
    this.curr_account_or_ticker_changed = true;
    this.updateCurrForm();
    this.priceOutChanged();
  }

  selectTppChanged(event: any){    
    const selectedOption = event.target.options[event.target.selectedIndex];
    this.curr_tpp_id = selectedOption.value;
    this.curr_tpp_name = selectedOption.text;
  }

  // Update actions
  updateCommission(){
    //this.loggerService.log(Tlog.info, this.tickerAccounts);
    this.formdata.commission = this.tickerAccounts.find(x => x.tickerid == this.curr_ticker_id && x.accountid == this.curr_account_id)?.commission || 0;    
    this.curr_account_or_ticker_changed = false;
  }

  updateCurrForm(){
    if (this.curr_account_or_ticker_changed){
      this.updateCommission();
    }
  }

  // --------------------------------------------------------------
} // end class