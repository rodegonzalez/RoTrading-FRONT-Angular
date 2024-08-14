import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService, Tlog } from '../services/logger.service';
import { map, Observable } from 'rxjs';
import { IPositionView } from '../interfaces/IPosition.interface';
import { environment } from '../environment/global.environment';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

    //positions: IPosition[] = []

    constructor(private http:HttpClient, private loggerService: LoggerService) {}

    getAll(): Observable<IPositionView[]>{
        return this.http
        .get(environment.APIUri + '/positions')
        .pipe(
            map(data => {
                let positions: Array<IPositionView> = [];
                for (const id in Object.keys(data)){
                    const _position: IPositionView = Object.values(data)[id];
                    positions.push(_position);
                }
                return positions;
            })
        );
    }

    getAllByStatus(status: string): Observable<IPositionView[]>{
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
                let positions: Array<IPositionView> = [];
                for (const id in Object.keys(data)){
                    const _position: IPositionView = Object.values(data)[id];
                    // fix Pricein
                    _position.pricein = _position.pricein * 100/100;

                    // Fix datetimein
                    //const _datetime: string = _position.datetimein.split(" ")[1];
                    //const _datetime_time = _datetime.split(":");
                    //_position.datetimein = _datetime_time[0] + ":" + _datetime_time[1];
                    
                    // prepare position for html
                    positions.push(_position);
                }
                return positions;
            })
        );
    }


    // POST

    savePosition(): any{

        const headers = {'Content-Type': 'multipart/json charset=utf-8'};
        const body = { title: 'title post var', msg: "mensaje" };
        let uri = environment.APIUri +"/position";

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
    
    // POST
    savePositionForm(formdata: any): Promise<void>{
        const headers = {'Content-Type': 'multipart/form-data charset=utf-8'};
        let uri = environment.APIUri +"/position";

        this.loggerService.log(Tlog.info, "Sending new position to: " + uri);
        this.loggerService.log(Tlog.info, "SERVICE formdata: ");
        this.loggerService.log(Tlog.info, formdata);

        return new Promise((resolve, reject) => {
            this.http.post<any>(uri,formdata).subscribe({
                complete: () => {
                    resolve();
                },
            next: (data: any) => {
                this.loggerService.log(Tlog.info, "savePositionForm data:");
                this.loggerService.log(Tlog.info, data);
                },
            error: e => {
                this.loggerService.log(Tlog.error, "savePositionForm error:");
                  this.loggerService.log(Tlog.error, e);
                  reject(e);
            }
            });
        });
    }

    /*
    savePositionForm(formdata: any): any{
        const headers = {'Content-Type': 'multipart/form-data charset=utf-8'};
        let uri = environment.APIUri +"/position";

        this.loggerService.log(Tlog.info, "Sending new position to: " + uri);
        this.loggerService.log(Tlog.info, "SERVICE formdata: ");
        this.loggerService.log(Tlog.info, formdata);

        return this.http.post<any>(uri,formdata).subscribe({
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
    */

    // PUT
    updatePositionForm(formdata: any): any{

        const headers = {'Content-Type': 'multipart/form-data charset=utf-8'};
        //const body = { title: 'title post var' };
        //let uri = environment.APIUri +"/positions/savepositionform";
        let uri = environment.APIUri +"/position/" + formdata.id;

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
