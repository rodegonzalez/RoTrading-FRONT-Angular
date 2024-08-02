import { Component,Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PositionSetupsService } from '../../../../services/position_setups.service';
import { IPositionSetup } from '../../../../interfaces/IPositionSetup.interface';
import { NgForm } from '@angular/forms';
import { LoggerService, Tlog } from '../../../../services/logger.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-setup-edit',
  templateUrl: './setup-edit.component.html',
  styleUrls: []
})

export class SetupEditComponent {
  @ViewChild('input_active') input_active!: ElementRef;

  public itemId: number;
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


  onSubmit(): void{
    this.item.active = this.input_active.nativeElement.checked ? 1 : 0;
    this.positionSetupsService.update(this.item, this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data despues: ");
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


