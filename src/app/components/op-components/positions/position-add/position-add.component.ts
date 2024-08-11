import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

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
    , private divisaService: DivisaService
    , private loggerService: LoggerService
    , private router: Router
    , private sharedModule: SharedModule) 
    {
    }


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
      this.loggerService.log(Tlog.info, "Todas las funciones de carga completadas.");
      this.loadDefaultData();
    }).catch((error) => {
      this.loggerService.log(Tlog.error, "Error en la carga de datos:");
      this.loggerService.log(Tlog.error, error);
    });

    // update timeouts
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