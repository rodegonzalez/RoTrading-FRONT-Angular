import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { IAccount } from '../../interfaces/IAccount.interface';

@Component({
  selector: 'app-op-panel-accounts',
  templateUrl: './op-panel-accounts.component.html',
  styles: [
  ]
})
export class OpPanelAccountsComponent implements OnInit {
  accounts: Array<IAccount>;

  constructor(private accountsService: AccountsService) {
    this.accounts = new Array<IAccount> ;
   }

  ngOnInit(): void{

    this.accountsService.getAll().subscribe({
      complete: () => {
          console.log("accountsService.getAll() vía http - Terminado.");

      },
      next: (data: Array<IAccount>) => {
        console.log("accountsService.getAll() vía http - data:");
        console.log(data);
        this.accounts = data;        
      },
      error: (e: any) => {
        console.log("accountsService.getAll() vía http - http error.");
        console.log(e);
      }
    });
  }

}
