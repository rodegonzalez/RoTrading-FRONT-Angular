import { Component,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PositionSetupsService } from '../../../../services/position_setups.service';
import { IPositionSetup } from '../../../../interfaces/IPositionSetup.interface';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-setup-detail',
  templateUrl: './setup-detail.component.html',
  styleUrls: []
})

export class SetupDetailComponent {
  //@Input() item: any;


  public itemId: number;
  //item: Array<ITpp>;
  item: IPositionSetup;


  constructor(private route: ActivatedRoute, private router: Router
    , private positionSetupsService: PositionSetupsService
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
      deleted: 0
    };
    
  }

  onGo(id:any){
    this.itemId = +id;
    this.router.navigate(['pattern-detail', this.itemId]);
  }

  ngOnInit(): void{
    this.positionSetupsService.getOne(this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
      },

        next : (data: IPositionSetup) => {
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
    this.positionSetupsService.deleteOne(this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
        this.onBack();
      },
    });
  }

  edit(): void{
    this.router.navigate(['/setup-edit/', this.itemId]);
  }

  onBack()
  {
    this.router.navigate(['/setups']);
  }

  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }
}


