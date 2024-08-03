import { Component,Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TickerService } from '../../../../services/ticker.service';
import { ITicker } from '../../../../interfaces/ITicker.interface';
import { NgForm } from '@angular/forms';
import { LoggerService, Tlog } from '../../../../services/logger.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-ticker-edit',
  templateUrl: './ticker-edit.component.html',
  styleUrls: []
})

export class TickerEditComponent {
  @ViewChild('input_active') input_active!: ElementRef;

  public itemId: number;
  item: ITicker;

  constructor(private route: ActivatedRoute, private router: Router
    , private tickerService: TickerService
    , private loggerService: LoggerService) {
    const id = 'id';
    this.itemId = +this.route.snapshot.params[id];

    // Inicializa item con un objeto vacío o con los valores necesarios
    this.item = {
      name: '',
      description: '',
      status: '',              
      creation: '',
      modification: '',
      id: 0,
      note:'',
      active: 0,
      deleted: 0,
      tickmin: 0,
      tickminvalue: 0,
      divisaid: 0
    };
    
  }

  ngOnInit(): void{
    this.tickerService.getOne(this.itemId).subscribe({
      complete: () => {

        
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
      },
        next : (data: ITicker) => {
        this.item = data;
        this.loggerService.log(Tlog.info,"data en next: ");
        this.loggerService.log(Tlog.info,this.item);
        
      },
      error : (e) => {
       this.loggerService.log(Tlog.error,"Service-http error:");
       this.loggerService.log(Tlog.error,e);
      }
    });
  }

  deleteOne(): void{
    this.tickerService.deleteOne(this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
          this.router.navigate(['/tickers']);
      },
    });
  }


  onSubmit(): void{
    this.item.active = this.input_active.nativeElement.checked ? 1 : 0;
    this.tickerService.update(this.item, this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data despues: ");
         this.loggerService.log(Tlog.info,this.item);
          this.router.navigate(['/ticker-detail/' + this.itemId]);
      },
    });
  }

  onBack()
  {
    this.router.navigate(['/tickers']);
  }

  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }

  onBackToDetails(){
    const uri = '/ticker-detail/' + this.itemId;
    this.router.navigate([uri]);
  }


}


