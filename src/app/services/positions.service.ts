import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService, Tlog } from '../services/logger.service';
import { map, Observable } from 'rxjs';
import { IPosition, IPositionView } from '../interfaces/IPosition.interface';
import { environment } from '../environment/global.environment';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

    constructor(private http:HttpClient, private loggerService: LoggerService) {}

    getOne(id: number): Observable<any>{
        return this.http.get(environment.APIUri + '/position/' + id)
        .pipe(
            map(data => {
                const _item: IPosition = data as IPosition;
                return _item;
            })  
        );
    }

    getAll(): Observable<IPositionView[]>{
        return this.http.get(environment.APIUri + '/positions')
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
        return this.http.get(uri)
        .pipe(
            map(data => {
                let positions: Array<IPositionView> = [];
                for (const id in Object.keys(data)){
                    const _position: IPositionView = Object.values(data)[id];
                    // fix Pricein
                    _position.pricein = _position.pricein * 100/100;

                    positions.push(_position);
                }
                return positions;
            })
        );
    }

    // POST
    savePositionForm(formdata: any): Promise<void>{
        let uri = environment.APIUri +"/position";
        return new Promise((resolve, reject) => {

            this.loggerService.log(Tlog.info, "savePositionForm");
            this.loggerService.log(Tlog.info, formdata);
            
            this.http.post<any>(uri,formdata).subscribe({
                complete: () => {
                    resolve();
                },
            next: (data: any) => {
                },
            error: e => {
                this.loggerService.log(Tlog.error, "savePositionForm error:");
                this.loggerService.log(Tlog.error, e);
                reject(e);
            }
            });
        });
    }

    // PUT
    updatePositionForm(formdata: any, id: number): any{
        let uri = environment.APIUri +"/position/" + id;
        return this.http.put(uri, formdata);
    }

    closePositionForm(formdata: any, id: number): any{
        let uri = environment.APIUri +"/position-close/" + id;
        return this.http.put(uri, formdata);
    }

} // end class
