import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService, Tlog } from './logger.service';
import { map, Observable } from 'rxjs';
import {IPositionPattern} from '../interfaces/IPositionPattern.interface';
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
                let positions: Array<IPositionPattern> = [];
                for (const id in Object.keys(data)){
                    const _position: IPositionPattern = Object.values(data)[id];
                    positions.push(_position);
                }
                return positions;
            })
        );
    }




  }


