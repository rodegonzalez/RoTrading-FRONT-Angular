import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../../../services/accounts.service';
import { IAccount } from '../../../../interfaces/IAccount.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: []
})
export class AccountListComponent implements OnInit  {

  items: Array<IAccount>;

  constructor(private route: ActivatedRoute,  private router: Router
    , private accountsService: AccountsService
    , private loggerService: LoggerService) {
    this.items = new Array<IAccount> ;
   }

  ngOnInit(): void{
    this.accountsService.getAll().subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.items);
      },

      next : (data: Array<IAccount>) => {
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
