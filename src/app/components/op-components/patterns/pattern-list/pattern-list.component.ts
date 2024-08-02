import { Component, OnInit } from '@angular/core';
import { PatternService } from '../../../../services/pattern.service';
import { IPattern } from '../../../../interfaces/IPattern.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-pattern-list',
  templateUrl: './pattern-list.component.html',
  styleUrls: []
})
export class PatternListComponent implements OnInit  {

  items: Array<IPattern>;

  constructor(private route: ActivatedRoute,  private router: Router
    , private patternService: PatternService
    , private loggerService: LoggerService) {
    this.items = new Array<IPattern> ;
   }

  ngOnInit(): void{
    this.patternService.getAll().subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.items);
      },

      next : (data: Array<IPattern>) => {
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
