import { Component, OnInit } from '@angular/core';
import { TppService } from '../../../services/tpp.service';
import { ITpp } from '../../../interfaces/ITpp.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService, Tlog } from '../../../services/logger.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './tpp-list.component.html',
  styleUrls: []
})
export class TppListComponent implements OnInit  {

  items: Array<ITpp>;

  constructor(private route: ActivatedRoute,  private router: Router
    , private tppService: TppService
    , private loggerService: LoggerService) {
    this.items = new Array<ITpp> ;
   }

  ngOnInit(): void{
    this.tppService.getAll().subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado tppService-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.items);
      },

      next : (data: Array<ITpp>) => {
        this.items = data;
      },
      error : (e) => {
       this.loggerService.log(Tlog.error,"tppService-http error:");
       this.loggerService.log(Tlog.error,e);
      }
    });
  }

  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }
}
