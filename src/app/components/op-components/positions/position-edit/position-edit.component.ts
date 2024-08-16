import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Decimal } from 'decimal.js';
import { FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

import { IPosition } from 'src/app/interfaces/IPosition.interface';
import { IPositionSetup } from 'src/app/interfaces/IPositionSetup.interface';
import { IPositionHighPattern, IPositionPattern } from 'src/app/interfaces/IPositionPattern.interface';
import { ITicker } from 'src/app/interfaces/ITicker.interface';
import { ITickerAccount } from 'src/app/interfaces/ITickerAccount.interface';
import { ITpp, ITppGetSecuence } from 'src/app/interfaces/ITpp.interface';
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
import { SessionsService } from '../../../../services/sessions.service';
import { LoggerService, Tlog } from '../../../../services/logger.service';

import { SharedModule } from 'src/app/shared/shared.module';
import { ISession } from 'src/app/interfaces/ISession.interface';

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
  @ViewChild('selectSetupTemporality') selectSetupTemporality!: ElementRef;
  @ViewChild('selectSetup') selectSetup!: ElementRef;
  @ViewChild('selectHighPattern') selectHighPattern!: ElementRef;
  @ViewChild('selectPattern') selectPattern!: ElementRef;
  @ViewChild('selectAccount') selectAccount!: ElementRef;

  tpps: Array<ITpp> = [];
  divisas: Array<IDivisa> = [];
  accounts: Array<IAccount> = [];
  tickers: Array<ITicker> = [];
  tickerAccounts: Array<ITickerAccount> = [];
  positionSetups: Array<IPositionSetup> = [];
  positionPatterns: Array<IPositionPattern> = [];
  positionHighPatterns: Array<IPositionPattern> = [];

  // --------------------------------------------------------------
  //TODO: get current from defaults or previous; in server and force form update after load data
  curr_account_or_ticker_changed: boolean = true;
  curr_tpp_name: string = "";
  d_tppblocksec: string = "";
  curr_account_name: string = "";
  curr_ticker_name: string = "";
  curr_divisa_name: string = "";

  // --------------------------------------------------------------

  formdata: IPosition = {
    id: 0, creation: "", modification: "",
    sessionid: "0", usdeur: 0, guid: "",  
    tppid: 0, tppblocksec: 0, sec: 0, tppcheck: 0,
    divisaid: 0, accountid: 0, tickerid: 0, pattern1id: 0, pattern2id: "0", setup1id: "0", setup2id: 0,  
    timein: "", timeout: "", buysell: "buy", pricein: 0, priceout: 0,
    opresultticks: 0, opresult: 0, contracts: 1, commission: 4.5, opresulteur: 0,    
    imagepath: "", status: "", deleted: 0, deletednote: "", processed: 0, note: "",         
    };

  session: ISession = { 
    id: this.sharedModule.getSessionid(), creation: "", modification: "", usdeur: 0, haspositions: 0, consolidated: 0, status: "", sessionnote: "", active: 0, deleted: 0 
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
    , private sessionsService: SessionsService
    , private loggerService: LoggerService
    , private router: Router
    , private route: ActivatedRoute
    , private sharedModule: SharedModule
    , private decimalPipe: DecimalPipe) 
    {
      const id = 'id';
      this.formdata.id = this.route.snapshot.params[id];
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
              this.loggerService.log(Tlog.error, "loadTppsAsync data:");
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

  loadSessionAsync(): Promise<void> {
    //this.loggerService.log(Tlog.info, "loadSessionAsync init: sessionid=" + this.session.id);
    return new Promise((resolve, reject) => {
            this.sessionsService.getOrCreateSessionIfNotExists(this.session.id).subscribe({
            complete: () => {
                resolve();
            },
            next: (data: ISession) => {
              this.session = data;        
            },
            error: (e: any) => {
              this.loggerService.log(Tlog.error, "loadSessionAsync error:");
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

   // --------------------------------------------------------------
   // --------------------------------------------------------------

  ngOnInit(){  

    // load position
    this.positionsService.getOne(this.formdata.id).subscribe({
      complete: () => {
         this.session.id = this.formdata.sessionid;
         this.loadSessionAsync();
      },
        next : (data: IPosition) => {
        this.formdata = data;
      },
      error : (e) => {
       this.loggerService.log(Tlog.error,"tppService-http error:");
       this.loggerService.log(Tlog.error,e);
      }
    });

    // load data
    this.loadDataAsync().then(() => {
      // after async... do it!
      this.curr_account_name = this.accounts.find(x => x.id == this.formdata.accountid)?.name || "";
      this.curr_ticker_name = this.tickers.find(x => x.id == this.formdata.tickerid)?.name || "";
      this.curr_tpp_name = this.tpps.find(x => x.id == this.formdata.tppid)?.name || "";
      this.curr_divisa_name = this.divisas.find(x => x.id == this.formdata.divisaid)?.name || "";;
      this.curr_account_or_ticker_changed = true;
      this.updateCurrForm();
      this.updateTppSecuence();      
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

    const mydate = this.sharedModule.getDateTime();
    this.formdata.creation = mydate;
    this.formdata.modification = mydate;
    this.formdata.deleted = 0;
    this.formdata.processed = 0;
    this.formdata.status = "opened";
    this.formdata.buysell = this.formdata.buysell.toLowerCase() == "buy" ? 'buy' : 'sell';
    this.formdata.tppcheck = this.input_tppCheck.nativeElement.checked ? 1 : 0;

    // transform to numbers
    this.formdata.pattern1id = Number(this.formdata.pattern1id);
    this.formdata.setup2id = Number(this.formdata.setup2id);

    // LOG Form data
    this.loggerService.log(Tlog.info, "FORM formdata:");
    this.loggerService.log(Tlog.info, this.formdata);
  }

  async onSubmit() {

    if (!this.validate()){
      return;
    }

    const mydate = this.sharedModule.getDateTime();
    this.formdata.creation = mydate;
    this.formdata.modification = mydate;
    this.formdata.deleted = 0;
    this.formdata.processed = 0;
    this.formdata.status = "opened";
    
    this.formdata.buysell = this.formdata.buysell.toLowerCase() == "buy" ? 'buy' : 'sell';
    this.formdata.tppcheck = this.input_tppCheck.nativeElement.checked ? 1 : 0;

    // transform to numbers
    this.formdata.pattern1id = Number(this.formdata.pattern1id);
    this.formdata.setup2id = Number(this.formdata.setup2id);

    // finally close the position
    this.formdata.status = "closed";

    /*
    this.loggerService.log(Tlog.info, "FORM formdata:");
    this.loggerService.log(Tlog.info, this.formdata);
    */

    this.updatePosition();
    
  }

  async updatePosition() {
    try {
      await firstValueFrom(this.positionsService.updatePositionForm(this.formdata, this.formdata.id));
      // Navegar después de que la actualización se complete
      await this.router.navigateByUrl('/', { skipLocationChange: true });
      await this.router.navigate(['/positions']);
    } catch (e) {
      this.loggerService.log(Tlog.error, "updatePositionForm error:");
      this.loggerService.log(Tlog.error, e);
    }
  }

  // --------------------------------------------------------------
  // Validation
  // --------------------------------------------------------------

  validate(){
    let errors = [];

    if (this.formdata.contracts == 0){
      errors.push("Contracts is required");
    }
    if (this.formdata.usdeur == 0){
      errors.push("USDEUR is required");
    }
    const selectedHighPatternValue = this.selectHighPattern.nativeElement.value;
    if (selectedHighPatternValue == "0"){
      errors.push("High pattern is required");
    }
    const selectedPatternValue = this.selectPattern.nativeElement.value;
    if (selectedPatternValue == "0"){
      errors.push("Pattern is required");
    }
    const selectedSetupTemporalityValue = this.selectSetupTemporality.nativeElement.value; 
    if (selectedSetupTemporalityValue == "0"){
      errors.push("Setup temporality is required");
    }
    const selectedSetupValue = this.selectSetup.nativeElement.value; 
    if (selectedSetupValue.toLowerCase() == "0"){
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

  formatPriceOut() {
    const formattedPrice = this.decimalPipe.transform(this.formdata.priceout, '1.2-2');
    if (formattedPrice !== null) {
      this.formdata.priceout = Number(formattedPrice);
      this.loggerService.log(Tlog.info, "this.formdata.priceout: " + this.formdata.priceout);
    }
  }

  priceOutChanged(){
    const ticker = this.tickers.find(x => x.id == this.formdata.tickerid) || { tickmin: 0, tickminvalue: 0 };
    const pricein = new Decimal(this.formdata.pricein);
    const priceout = new Decimal(this.formdata.priceout);
    const contracts = new Decimal(this.formdata.contracts);
    const commission = new Decimal(this.formdata.commission);
    const buysell = (this.formdata.buysell.toLowerCase() == "buy") ? new Decimal(1) : new Decimal(-1);
    const diff = priceout.minus(pricein).times(buysell);
    const resultticks = diff.dividedBy(ticker.tickmin);
    const result = resultticks.times(contracts).times(ticker.tickminvalue).minus(commission);
    const resulteur = result.times(this.formdata.usdeur);

    this.formdata.opresultticks = resultticks.toNumber();
    this.formdata.opresult = result.toNumber();
    this.formdata.opresulteur = resulteur.toNumber();
      
    /*
    this.loggerService.log(Tlog.info, "-----------------------------------------------");
    this.loggerService.log(Tlog.info, "PriceOut changed: ");
    this.loggerService.log(Tlog.info, "USDEUR: " + this.curr_session_usdeur);
    this.loggerService.log(Tlog.info, "this.formdata.tickerid: " + this.formdata.tickerid);
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

  ticksChanged(){
    const ticker = this.tickers.find(x => x.id == this.formdata.tickerid) || { tickmin: 0, tickminvalue: 0 };
    const maxdecimals = new Decimal(this.sharedModule.countDecimalDigits(ticker.tickmin));
    const resultticks = new Decimal(this.formdata.opresultticks).toDecimalPlaces(0);
    const pricein = new Decimal(this.formdata.pricein);
    const buysell = (this.formdata.buysell.toLowerCase() == "buy") ? new Decimal(1) : new Decimal(-1);
    const diff = resultticks.times(ticker.tickmin);
    const priceout = pricein.add(diff.times(buysell)).toDecimalPlaces(maxdecimals.toNumber());
    //const priceoutFormatted = priceout.toFixed(maxdecimals.toNumber()); // Formatear con decimales
    const contracts = new Decimal(this.formdata.contracts);
    const commission = new Decimal(this.formdata.commission);        
    const result = resultticks.times(contracts).times(ticker.tickminvalue).minus(commission);
    const resulteur = result.times(this.formdata.usdeur);

    this.formdata.priceout = priceout.toNumber();
    this.formdata.opresultticks = resultticks.toNumber();
    this.formdata.opresult = result.toNumber();
    this.formdata.opresulteur = resulteur.toNumber();

    /*
    this.loggerService.log(Tlog.info, "-----------------------------------------------");
    this.loggerService.log(Tlog.info, "ticksChanged changed: ");
    this.loggerService.log(Tlog.info, "USDEUR: " + this.curr_session_usdeur);
    this.loggerService.log(Tlog.info, "this.formdata.tickerid: " + this.formdata.tickerid);
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

  usdeurChanged(){
    const usdeur = new Decimal(this.formdata.usdeur).toDecimalPlaces(4);
    const result = new Decimal(this.formdata.opresult);
    if (!result.isNaN() || !result.equals(0)){
    const resulteur = result.times(usdeur);
    this.formdata.opresulteur = resulteur.toNumber();
    }else{
      this.formdata.opresulteur = 0;
    }

    // update session on db
    this.updateSession();
  }

  selectAccountChanged(event: any){   
    const selectedOption = event.target.options[event.target.selectedIndex];
    this.formdata.accountid = selectedOption.value;
    this.curr_account_name = selectedOption.text;
    this.curr_account_or_ticker_changed = true;
    this.updateCurrForm();
  }

  selectTickerChanged(event: any){    
    const selectedOption = event.target.options[event.target.selectedIndex];
    this.formdata.tickerid = selectedOption.value;
    this.curr_ticker_name = selectedOption.text;
    this.curr_account_or_ticker_changed = true;
    this.updateCurrForm();
    this.priceOutChanged();
  }

  selectTppChanged(event: any){    
    const selectedOption = event.target.options[event.target.selectedIndex];
    this.formdata.tppid = selectedOption.value;
    this.curr_tpp_name = selectedOption.text;
    this.updateTppSecuence()
  }

  // Update actions --------------------------------------------------------------
  
  sessionNotesChanged(){    
    this.updateSession();
  }

  sessionChanged(){
    this.session.id = this.formdata.sessionid;
    this.sessionsService.getOrCreateSessionIfNotExists(this.session.id).subscribe({
      complete: () => {
        //this.loggerService.log(Tlog.info, "sessionChanged complete");
      },
      error: (e: any) => {
        this.loggerService.log(Tlog.error, "sessionChanged error:");
        this.loggerService.log(Tlog.error, e);
      }
    });

    this.updateSession();
  }

  updateSession(){
    this.session.id = this.formdata.sessionid;   
    this.session.usdeur = Number(new Decimal(this.formdata.usdeur).toDecimalPlaces(4).toString());
    this.sessionsService.update(this.session, this.session.id).subscribe({
      complete: () => {
        //this.loggerService.log(Tlog.info, "updateSession complete");
      },
      error: (e: any) => {
        this.loggerService.log(Tlog.error, "updateSession error:");
        this.loggerService.log(Tlog.error, e);
      }
    });
  }

  updateCommission(){
    this.formdata.commission = this.tickerAccounts.find(x => x.tickerid == this.formdata.tickerid && x.accountid == this.formdata.accountid)?.commission || 0;    
    this.curr_account_or_ticker_changed = false;
  }

 
  updateTppSecuence(){    
    let dataGetSecuence: ITppGetSecuence;
    this.tppService.getSecuence(this.formdata.tppid).subscribe({
      complete: () => {

        var tppblocksec = new Decimal(1);
        var sec = new Decimal(1);
        const tpp = this.tpps.find(x => x.id == this.formdata.tppid);
        const prefix = tpp?.blockprefix || "";
        const maxblocksecuence = tpp?.maxblocksecuence || 0;

        if (tpp != undefined || tpp != null){        
          tppblocksec = new Decimal(dataGetSecuence.tppblocksec)
          sec = new Decimal(dataGetSecuence.sec);
          if (sec.greaterThanOrEqualTo(maxblocksecuence)){
            tppblocksec = tppblocksec.plus(1);
            sec = new Decimal(1);
          }else{
            sec = sec.plus(1);
          }
        }
        
        this.d_tppblocksec = prefix + tppblocksec.toString().padStart(3, '0');
        this.formdata.tppblocksec = tppblocksec.toNumber();
        this.formdata.sec = sec.toNumber();
      },
      next: (data: ITppGetSecuence) => {
        dataGetSecuence = data;        
      },
      error: (e: any) => {
        this.loggerService.log(Tlog.error, "getSecuence error:");
        this.loggerService.log(Tlog.error, e);       
      }
    });

  }

  updateCurrForm(){
    if (this.curr_account_or_ticker_changed){
      this.updateCommission();
    }
  }

  // --------------------------------------------------------------
} // end class