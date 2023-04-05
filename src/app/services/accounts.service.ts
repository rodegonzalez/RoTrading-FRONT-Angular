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
                const accounts: Array<IAccount> = [];
                const mydata = Object.values(data)[0];
                for (const id in mydata){
                    accounts.push(mydata[id]);
                }
            return accounts;
            })
        );
    }

}
