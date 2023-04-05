import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAccount } from '../interfaces/IAccount.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

    //accounts: IAccount[] = []

    constructor(private http:HttpClient) { }

    getAll(): Observable<IAccount[]>{

        return this.http
        .get('http://localhost:8080/api/accounts')
        .pipe(            
            map(data => {
                let accounts: Array<IAccount> = [];
                for (const id in Object.keys(data)){
                    const _account: IAccount = {                        
                        Idaccount:      Object.values(data)[id]["idaccount"],
                        Name:           Object.values(data)[id]["name"],
                        Description:    Object.values(data)[id]["description"],                        
                        Creation:       Object.values(data)[id]["name"],                                 
                        Amount_initial: Object.values(data)[id]["amount_initial"],
                        Amount_current: Object.values(data)[id]["amount_current"],
                        Idbroker:       Object.values(data)[id]["idbroker"],
                        Iddivisa:       Object.values(data)[id]["iddivisa"],
                        Status:         Object.values(data)[id]["status"],
                    }
                    accounts.push(_account);
                }
                return accounts;                
            })
        );
    }

}
