import { Component,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PositionSetupsService } from '../../../../services/position_setups.service';
import { IPositionSetup } from '../../../../interfaces/IPositionSetup.interface';
import { NgForm } from '@angular/forms';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-setup-edit',
  templateUrl: './setup-edit.component.html',
  styleUrls: []
})

export class SetupEditComponent {

  public itemId: number;
  item: any;

  constructor(private route: ActivatedRoute, private router: Router
    , private positionSetupsService: PositionSetupsService
    , private loggerService: LoggerService) {
    const id = 'id';
    this.itemId = +this.route.snapshot.params[id];;
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
          this.router.navigate(['/setups']);
      },
    });
  }

  onSubmit(Form : NgForm): void{
    this.positionSetupsService.update(Form.value, this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
          this.router.navigate(['/setup-detail/' + this.itemId]);
      },
    });
  }


  onBack()
  {
    this.router.navigate(['/setups']);
  }

  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }

  onBackToDetails(){
    const uri = '/setup-detail/' + this.itemId;
    this.router.navigate([uri]);
  }


}


