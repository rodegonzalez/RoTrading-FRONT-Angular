import { Component, OnInit } from '@angular/core';
import { TickerService } from '../../../../services/ticker.service';
import { ITicker } from '../../../../interfaces/ITicker.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-ticker-list',
  templateUrl: './ticker-list.component.html',
  styleUrls: []
})
export class TickerListComponent implements OnInit  {

  items: Array<ITicker>;

  constructor(private route: ActivatedRoute,  private router: Router
    , private tickerService: TickerService
    , private loggerService: LoggerService) {
    this.items = new Array<ITicker> ;
   }

  ngOnInit(): void{
    this.tickerService.getAll().subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.items);
      },

      next : (data: Array<ITicker>) => {
        this.items = data;
      },
      error : (e) => {
       this.loggerService.log(Tlog.error,"Service-http error:");
       this.loggerService.log(Tlog.error,e);
      }
    });
  }

  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }
}
