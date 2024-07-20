import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService, Tlog } from '../services/logger.service';
import { map, Observable } from 'rxjs';
import { IPosition } from '../interfaces/IPosition.interface';
import {IPositionResponseInterface} from '../interfaces/iposition-response.interface';
import { environment } from '../environment/global.environment';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

    //positions: IPosition[] = []

    constructor(private http:HttpClient, private loggerService: LoggerService) {}

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


    // POST

    savePosition(): any{
        let response: IPositionResponseInterface;

        const headers = {'Content-Type': 'multipart/json charset=utf-8'};
        const body = { title: 'title post var', msg: "mensaje" };
        let uri = environment.APIUri +"/positions/saveposition";

        this.loggerService.log(Tlog.info, "Sending new position to: " + uri);

        return this.http
        //.post(uri,body, {headers}).subscribe({
            .post(uri,body).subscribe({
            next: data => {
            this.loggerService.log(Tlog.info, "http post response. data:");
            this.loggerService.log(Tlog.info, data);
            return null;
            },
            error: error => {
                this.loggerService.log(Tlog.error, error);
            }
        });
    }
    
    savePositionForm(formdata: any): any{
        let response: IPositionResponseInterface;

        const headers = {'Content-Type': 'multipart/form-data charset=utf-8'};
        //const body = { title: 'title post var' };
        let uri = environment.APIUri +"/positions/savepositionform";

        this.loggerService.log(Tlog.info, "Sending new position to: " + uri);
        this.loggerService.log(Tlog.info, "SERVICE formdata: ");
        this.loggerService.log(Tlog.info, formdata);

        return this.http
        .post<any>(uri,formdata).subscribe({
            next: data => {
            //response.msg = data.msg;
            //response.status = data.status;
            this.loggerService.log(Tlog.info, "http post response. data:");
            this.loggerService.log(Tlog.info, data);
            return null;
            },
            error: error => {
                this.loggerService.log(Tlog.error, error);
            }
        });
    }
}
