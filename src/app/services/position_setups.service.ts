import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService, Tlog } from '../services/logger.service';
import { map, Observable } from 'rxjs';
import {IPositionSetup} from '../interfaces/IPositionSetup.interface';
import { environment } from '../environment/global.environment';


@Injectable({
    providedIn: 'root'
  })
  export class PositionSetupsService {

    constructor(private http:HttpClient, private loggerService: LoggerService) {}

    getAll(): Observable<IPositionSetup[]>{
        return this.http
        .get(environment.APIUri + '/position_setups')
        .pipe(
            map(data => {
                let items: Array<IPositionSetup> = [];
                for (const id in Object.keys(data)){
                    const item: IPositionSetup = Object.values(data)[id];
                    items.push(item);
                }
                this.loggerService.log(Tlog.info, 'itemsetupsService-getAll() -> data:');
                this.loggerService.log(Tlog.info, items);
                return items;
            })
        );
    }

    getOne(id: any): Observable<IPositionSetup>{
        return this.http.get(environment.APIUri + '/position_setup/' + id)
        .pipe(
            map(data => {
                const _item: IPositionSetup = Object.values(data)[0];
                this.loggerService.log(Tlog.info,"items en service en next: ");
                this.loggerService.log(Tlog.info,_item);
                return _item;
            })  
        );
    }

    deleteOne(id: any): any{
        this.loggerService.log(Tlog.info,"items en service delete: entrando ");
        this.loggerService.log(Tlog.info,"id="+ id);
        return this.http.delete(environment.APIUri + '/position_setup/' + id)
            .pipe( map(data =>{
                this.loggerService.log(Tlog.info,"items en service delete: saliendo ");
                this.loggerService.log(Tlog.info,"id="+ id);
            })            
        );        
    }

    create(data: any): Observable<any>{
        this.loggerService.log(Tlog.info,"items en service create: entrando ");
        this.loggerService.log(Tlog.info,"data="+ data);
        return this.http.post(environment.APIUri + '/position_setup',data)
            .pipe( map(data =>{
                this.loggerService.log(Tlog.info,"returned id="+ data);               
            })            
        );        
    }

    update(data: any, id: number): Observable<any>{
        this.loggerService.log(Tlog.info,"items en service update: entrando ");
        this.loggerService.log(Tlog.info,"data="+ data);
        return this.http.put(environment.APIUri + '/position_setup/' + id, data)
            .pipe( map(data =>{                
            })            
        );        
    }
            
  }


