import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, observable, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ITicker } from '../interfaces/ITicker.interface';
import { environment } from '../environment/global.environment';
import { LoggerService, Tlog } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class TickerService {

    //accounts: IAccount[] = []

    constructor(private http:HttpClient
        , private router: Router
        , private loggerService: LoggerService) { }

    getAll(): Observable<ITicker[]>{
        return this.http.get(environment.APIUri + '/tickers')
        .pipe(
            map(data => {
                let items: Array<ITicker> = [];
                for (const id in Object.keys(data)){
                    const _item: ITicker = Object.values(data)[id];
                    items.push(_item);
                }
                return items;
            })
        );
    }

    //getOne(id: any): Observable<ITpp[]>{
    getOne(id: any): Observable<ITicker>{
        return this.http.get(environment.APIUri + '/ticker/' + id)
        .pipe(
            map(data => {
                //let items: Array<ITpp> = [];
                const _item: ITicker = Object.values(data)[0];
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

        return this.http.delete(environment.APIUri + '/ticker/' + id)
            .pipe( map(data =>{
               this.loggerService.log(Tlog.info,"items en service delete: saliendo ");
               this.loggerService.log(Tlog.info,"id="+ id);
            })            
        );        
    }

    create(data: any): Observable<any>{

       this.loggerService.log(Tlog.info,"items en service create: entrando ");
       this.loggerService.log(Tlog.info,"data="+ data);

        return this.http.post(environment.APIUri + '/ticker',data)
            .pipe( map(data =>{
               this.loggerService.log(Tlog.info,"returned id="+ data);               
            })            
        );        
    }

    update(data: any, id: number): Observable<any>{

       this.loggerService.log(Tlog.info,"items en service update: entrando ");
       this.loggerService.log(Tlog.info,"data="+ data);

        return this.http.put(environment.APIUri + '/ticker/' + id, data)
            .pipe( map(data =>{                
            })            
        );        
    }


}
