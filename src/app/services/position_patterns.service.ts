import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService, Tlog } from './logger.service';
import { map, Observable } from 'rxjs';
import {IPositionPattern, IPositionHighPattern} from '../interfaces/IPositionPattern.interface';
import { environment } from '../environment/global.environment';


@Injectable({
    providedIn: 'root'
  })
  export class PositionPatternsService {

    constructor(private http:HttpClient, private loggerService: LoggerService) {}

    getAll(): Observable<IPositionPattern[]>{
        return this.http
        .get(environment.APIUri + '/position_patterns')
        .pipe(
            map(data => {
                let items: Array<IPositionPattern> = [];
                for (const id in Object.keys(data)){
                    const _item: IPositionPattern = Object.values(data)[id];
                    items.push(_item);
                }
                return items;
            })
        );
    }

  }


  @Injectable({
    providedIn: 'root'
  })
  export class PositionHighPatternsService {

    constructor(private http:HttpClient, private loggerService: LoggerService) {}

    getAll(): Observable<IPositionHighPattern[]>{
        return this.http
        .get(environment.APIUri + '/position_highpatterns')
        .pipe(
            map(data => {
                let items: Array<IPositionHighPattern> = [];
                for (const id in Object.keys(data)){
                    const _item: IPositionHighPattern = Object.values(data)[id];
                    items.push(_item);
                }
                return items;
            })
        );
    }

    getOne(id: any): Observable<IPositionHighPattern>{
        return this.http.get(environment.APIUri + '/position_highpattern/' + id)
        .pipe(
            map(data => {
                //let items: Array<ITpp> = [];
                //const _item: IPositionHighPattern = Object.values(data)[0];
                const _item: IPositionHighPattern = data as IPositionHighPattern;
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

        return this.http.delete(environment.APIUri + '/position_highpattern/' + id)
            .pipe( map(data =>{
               this.loggerService.log(Tlog.info,"items en service delete: saliendo ");
               this.loggerService.log(Tlog.info,"id="+ id);
            })            
        );        
    }

    create(data: any): Observable<any>{
       this.loggerService.log(Tlog.info,"items en service create: entrando ");
       this.loggerService.log(Tlog.info,"data="+ data);

        return this.http.post(environment.APIUri + '/position_highpattern',data)
            .pipe( map(data =>{
               this.loggerService.log(Tlog.info,"returned id="+ data);               
            })            
        );        
    }

    update(data: any, id: number): Observable<any>{
       this.loggerService.log(Tlog.info,"items en service update: entrando ");
       this.loggerService.log(Tlog.info,"data="+ data);

        return this.http.put(environment.APIUri + '/position_highpattern/' + id, data)
            .pipe( map(data =>{                
            })            
        );        
    }



  }