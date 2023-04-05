import { Component } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { IAccount } from '../../interfaces/IAccount.interface';

@Component({
  selector: 'app-op-account',
  templateUrl: './op-account.component.html',
  styles: []
})
export class OpAccountComponent {

  accounts: Array<IAccount>;

  constructor(private accountsService: AccountsService) {
    this.accounts = new Array<IAccount> ;
   }

  ngOnInit(): void{

    this.accountsService.getAll().subscribe({
      complete: () => {
          console.log("accountsService.getAllAccounts() vía http - Terminado.");

      },
      /*
      next : (data: any) => {
        const keys = Object.keys(data);
        console.log("keys");
        console.log(keys);

        const values = Object.values(data);
        console.log("values");
        console.log(values);

        var entries = Object.entries(data);
        console.log("entries");
        console.log(entries);

        //this.properties = data;
        console.log("data");
        console.log(data);

        // assing properties from http response -------  byrg  ------  :S
        //this.properties = values[0];
        this.properties = Object.values(data)[0];
      },
      */
      next : (data: Array<IAccount>) => {
        console.log("accountsService.getAllAccounts() vía http - data:");
        console.log(data);
        this.accounts = data;        
      },
      error : (e: any) => {
        console.log("accountsService.getAllAccounts() vía http - http error.");
        console.log(e);
      }
    });
  }

}
