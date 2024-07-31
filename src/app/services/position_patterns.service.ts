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

  }