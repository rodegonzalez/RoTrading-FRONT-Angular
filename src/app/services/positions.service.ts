import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPosition } from '../interfaces/IPosition.interface';
import { environment } from '../environment/global.environment';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

    //positions: IPosition[] = []

    constructor(private http:HttpClient) {}

    getAll(): Observable<IPosition[]>{
        return this.http
        .get(environment.APIUri + '/positions')
        .pipe(
            map(data => {
                let positions: Array<IPosition> = [];
                for (const id in Object.keys(data)){
                    const _position: IPosition = Object.values(data)[id];
                    positions.push(_position);
                }
                return positions;
            })
        );
    }

    getAllByStatus(status: string): Observable<IPosition[]>{
        let uri: string;
        if (status == "opened"){
            uri = environment.APIUri + "/positions/opened";
        }else{
            uri = environment.APIUri +"/positions/notopened";
        }
        return this.http
        .get(uri)
        .pipe(
            map(data => {
                let positions: Array<IPosition> = [];
                for (const id in Object.keys(data)){
                    const _position: IPosition = Object.values(data)[id];
                    // fix Pricein
                    _position.pricein = _position.pricein * 100/100;

                    // Fix datetimein
                    const _datetime: string = _position.datetimein.split(" ")[1];
                    const _datetime_time = _datetime.split(":");
                    _position.datetimein = _datetime_time[0] + ":" + _datetime_time[1];
                    
                    // prepare position for html
                    positions.push(_position);
                }
                return positions;
            })
        );
    }

}
