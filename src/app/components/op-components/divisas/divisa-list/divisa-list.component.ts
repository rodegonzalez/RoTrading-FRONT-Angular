import { Component, OnInit } from '@angular/core';
import { DivisaService } from '../../../../services/divisa.service';
import { IDivisa } from '../../../../interfaces/IDivisa.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-divisa-list',
  templateUrl: './divisa-list.component.html',
  styleUrls: []
})
export class DivisaListComponent implements OnInit  {

  items: Array<IDivisa>;

  constructor(private route: ActivatedRoute,  private router: Router
    , private divisaService: DivisaService
    , private loggerService: LoggerService) {
    this.items = new Array<IDivisa> ;
   }

  ngOnInit(): void{
    this.divisaService.getAll().subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.items);
      },

      next : (data: Array<IDivisa>) => {
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
