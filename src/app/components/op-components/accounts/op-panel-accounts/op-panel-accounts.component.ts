import { Component, OnInit } from '@angular/core';
import { LoggerService, Tlog } from '../../../../services/logger.service';
import { AccountsService } from '../../../../services/accounts.service';
import { IAccount } from '../../../../interfaces/IAccount.interface';

@Component({
  selector: 'app-op-panel-accounts',
  templateUrl: './op-panel-accounts.component.html',
  styles: [
  ]
})
export class OpPanelAccountsComponent implements OnInit {
  accounts: Array<IAccount>;

  constructor(private accountsService: AccountsService, private loggerService: LoggerService) {
    this.accounts = new Array<IAccount> ;
   }

  ngOnInit(): void{

    this.accountsService.getAll().subscribe({
      complete: () => {
          this.loggerService.log(Tlog.info, "accountsService.getAll() vía http - Terminado.");

      },
      next: (data: Array<IAccount>) => {
        this.loggerService.log(Tlog.info, "accountsService.getAll() vía http - data:");
        this.loggerService.log(Tlog.info, data);
        this.accounts = data;        
      },
      error: (e: any) => {
        this.loggerService.log(Tlog.error, "accountsService.getAll() vía http - http error.");
        this.loggerService.log(Tlog.error, e);
      }
    });
  }

}
