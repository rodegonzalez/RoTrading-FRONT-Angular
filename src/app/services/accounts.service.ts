import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAccount } from '../interfaces/IAccount.interface';
import { environment } from '../environment/global.environment';
import { LoggerService, Tlog } from '../services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

    constructor(private http:HttpClient
        , private loggerService: LoggerService) { }

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

    getOne(id: any): Observable<IAccount>{
        return this.http.get(environment.APIUri + '/account/' + id)
        .pipe(
            map(data => {
                //let items: Array<ITpp> = [];
                //const _item: IAccount = Object.values(data)[0];
                const _item: IAccount = data as IAccount;
                //items.push(_item);
               this.loggerService.log(Tlog.info,"items en service en next: ");
               this.loggerService.log(Tlog.info,_item);
                //return items;
                return _item;
            })  
        );
    }

    deleteOne(id: any): any{
       this.loggerService.log(Tlog.info,"items en service delete: entrando ");
       this.loggerService.log(Tlog.info,"id="+ id);

        return this.http.delete(environment.APIUri + '/account/' + id)
            .pipe( map(data =>{
               this.loggerService.log(Tlog.info,"items en service delete: saliendo ");
               this.loggerService.log(Tlog.info,"id="+ id);
            })            
        );        
    }

    create(data: any): Observable<any>{
       this.loggerService.log(Tlog.info,"items en service create: entrando ");
       this.loggerService.log(Tlog.info,"data="+ data);

        return this.http.post(environment.APIUri + '/account',data)
            .pipe( map(data =>{
               this.loggerService.log(Tlog.info,"returned id="+ data);               
            })            
        );        
    }

    update(data: any, id: number): Observable<any>{

       this.loggerService.log(Tlog.info,"items en service update: entrando ");
       this.loggerService.log(Tlog.info,"data="+ data);

        return this.http.put(environment.APIUri + '/account/' + id, data)
            .pipe( map(data =>{                
            })            
        );        
    }


}
