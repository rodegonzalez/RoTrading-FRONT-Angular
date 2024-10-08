import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISession } from '../interfaces/ISession.interface';
import { environment } from '../environment/global.environment';
import { LoggerService, Tlog } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

    constructor(private http:HttpClient
        , private loggerService: LoggerService) { }

    getAll(): Observable<ISession[]>{
        return this.http
        .get(environment.APIUri + '/sessions')
        .pipe(
            map(data => {
                let items: Array<ISession> = [];
                for (const id in Object.keys(data)){
                    const _account: ISession = Object.values(data)[id];
                    items.push(_account);
                }
                return items;
            })
        );
    }

    getOne(id: string): Observable<any>{
        return this.http.post(environment.APIUri + '/session/createSessionIfNotExists/' + id, null)
        .pipe(
            map(data => {
                const _item: ISession = data as ISession;
                return _item;
            })  
        );
    }

    deleteOne(id: any): any{
        return this.http.delete(environment.APIUri + '/session/' + id)
            .pipe( map(data =>{
               this.loggerService.log(Tlog.info,"items en service delete: saliendo ");
               this.loggerService.log(Tlog.info,"id="+ id);
            })            
        );        
    }

    create(data: any): Observable<any>{
        return this.http.post(environment.APIUri + '/session',data)
            .pipe( map(data =>{
               this.loggerService.log(Tlog.info,"returned id="+ data);               
            })            
        );        
    }

    getOrCreateSessionIfNotExists(id: number): Observable<ISession>{   
         return this.http.post(environment.APIUri + '/session/createSessionIfNotExists/' + id, null)
         .pipe(
             map(data => {
                const _item = data as ISession;
                return _item;
             })  
         );
    }

    update(data: any, id: number): Observable<any>{
        this.loggerService.log(Tlog.info,"items en service update: data=");
        this.loggerService.log(Tlog.info,data);
        return this.http.put(environment.APIUri + '/session/' + String(id), data)
            .pipe( map(data =>{                
            })            
        );        
    }

}
