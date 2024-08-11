import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ITickerAccount } from '../interfaces/ITickerAccount.interface';
import { environment } from '../environment/global.environment';
import { LoggerService, Tlog } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class TickerAccountService {

    constructor(private http:HttpClient
        , private loggerService: LoggerService) { }

    getAll(): Observable<ITickerAccount[]>{
        return this.http.get(environment.APIUri + '/tickeraccounts')
        .pipe(
            map(data => {
                let items: Array<ITickerAccount> = [];
                for (const id in Object.keys(data)){
                    const _item: ITickerAccount = Object.values(data)[id];
                    items.push(_item);
                }
                return items;
            })
        );
    }

    getOne(idticker: number, idaccount: number): Observable<ITickerAccount>{
        return this.http.get(environment.APIUri + '/tickeraccount/' + idticker + '/' + idaccount)
        .pipe(
            map(data => {
                const _item: ITickerAccount = Object.values(data)[0];
                return _item;
            })  
        );
    }

}
