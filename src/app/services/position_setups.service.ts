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




  }


