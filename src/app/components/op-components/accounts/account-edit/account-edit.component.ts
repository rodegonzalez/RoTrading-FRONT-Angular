import { Component,Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../../../../services/accounts.service';
import { IAccount } from '../../../../interfaces/IAccount.interface';
import { NgForm } from '@angular/forms';
import { LoggerService, Tlog } from '../../../../services/logger.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: []
})

export class AccountEditComponent {
  @ViewChild('input_active') input_active!: ElementRef;

  public itemId: number;
  item: IAccount;

  constructor(private route: ActivatedRoute, private router: Router
    , private accountsService: AccountsService
    , private loggerService: LoggerService) {
    const id = 'id';
    this.itemId = +this.route.snapshot.params[id];

    // Inicializa item con un objeto vacío o con los valores necesarios
    this.item = {
      id: 0,
      name: '',
      description: '',
      status: '',              
      creation: '',
      modification: '',
      note:'',
      active: 0,
      deleted: 0,
      acctype: '',
      amount_initial: 0,
      amount_current: 0,
      divisaid: 0,
    };
    
  }

  ngOnInit(): void{
    this.accountsService.getOne(this.itemId).subscribe({
      complete: () => {

        
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
      },
        next : (data: IAccount) => {
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
    this.accountsService.deleteOne(this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
          this.router.navigate(['/accounts']);
      },
    });
  }


  onSubmit(): void{
    this.item.active = this.input_active.nativeElement.checked ? 1 : 0;
    this.accountsService.update(this.item, this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data despues: ");
         this.loggerService.log(Tlog.info,this.item);
          this.router.navigate(['/account-detail/' + this.itemId]);
      },
    });
  }

  onBack()
  {
    this.router.navigate(['/accounts']);
  }

  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }

  onBackToDetails(){
    const uri = '/account-detail/' + this.itemId;
    this.router.navigate([uri]);
  }


}


