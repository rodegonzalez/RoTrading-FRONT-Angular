import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService, Tlog } from './logger.service';
import { map, Observable } from 'rxjs';
import { environment } from '../environment/global.environment';

import { IBroker } from '../interfaces/IBoker.interface';

@Injectable({
  providedIn: 'root'
})
export class BrokersService {

    //positions: IPosition[] = []

    constructor(private http:HttpClient, private loggerService: LoggerService) {}

    getAll(): Observable<IBroker[]>{
        return this.http
        .get(environment.APIUri + '/brokers')
        .pipe(
            map(data => {
                let items: Array<IBroker> = [];
                for (const id in Object.keys(data)){
                    const _item: IBroker = Object.values(data)[id];
                    items.push(_item);
                }
                return items;
            })
        );
    }

    //POST
    save(): any{
        let response: IBroker;

        const headers = {'Content-Type': 'multipart/json charset=utf-8'};
        const body = { title: 'title post var', msg: "mensaje" };
        let uri = environment.APIUri +"/broker";

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
    
    //POST
    saveForm(formdata: any): any{
        let response: IBroker;

        const headers = {'Content-Type': 'multipart/form-data charset=utf-8'};
        let uri = environment.APIUri +"/broker";

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

    // PUT
    update(formdata: any): any{
        let response: IBroker;

        const headers = {'Content-Type': 'multipart/form-data charset=utf-8'};
        //const body = { title: 'title post var' };
        //let uri = environment.APIUri +"/positions/savepositionform";
        let uri = environment.APIUri +"/position";

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
