import { Component, OnInit } from '@angular/core';
import { PositionSetupsService } from '../../../../services/position_setups.service';
import { IPositionSetup } from '../../../../interfaces/IPositionSetup.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-setup-list',
  templateUrl: './setup-list.component.html',
  styleUrls: []
})
export class SetupListComponent implements OnInit  {

  items: Array<IPositionSetup>;

  constructor(private route: ActivatedRoute,  private router: Router
    , private positionSetupsService: PositionSetupsService
    , private loggerService: LoggerService) {
    this.items = new Array<IPositionSetup> ;
   }

  ngOnInit(): void{
    this.positionSetupsService.getAll().subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.items);
      },

      next : (data: Array<IPositionSetup>) => {
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
