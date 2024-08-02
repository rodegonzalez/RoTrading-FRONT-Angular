import { Component, OnInit } from '@angular/core';
import { PositionHighPatternsService } from '../../../../services/position_patterns.service';
import { IPositionHighPattern } from '../../../../interfaces/IPositionPattern.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: []
})
export class PatternListComponent implements OnInit  {

  items: Array<IPositionHighPattern>;

  constructor(private route: ActivatedRoute,  private router: Router
    , private positionHighPatternsService: PositionHighPatternsService
    , private loggerService: LoggerService) {
    this.items = new Array<IPositionHighPattern> ;
   }

  ngOnInit(): void{
    this.positionHighPatternsService.getAll().subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.items);
      },

      next : (data: Array<IPositionHighPattern>) => {
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
