import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAccount } from '../interfaces/IAccount.interface';
import { environment } from '../environment/global.environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

    //accounts: IAccount[] = []

    constructor(private http:HttpClient) { }

    getAll(): Observable<IAccount[]>{
        return this.http
        .get(environment.APIUri + '/accounts')
        .pipe(
            map(data => {
                let accounts: Array<IAccount> = [];
                for (const id in Object.keys(data)){
                    const _account: IAccount = Object.values(data)[id];
                    accounts.push(_account);
                }
                return accounts;
            })
        );
    }

}
