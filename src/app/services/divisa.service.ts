import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, observable, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IDivisa } from '../interfaces/IDivisa.interface';
import { environment } from '../environment/global.environment';
import { LoggerService, Tlog } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class DivisaService {

    constructor(private http:HttpClient
        , private router: Router
        , private loggerService: LoggerService) { }

    getAll(): Observable<IDivisa[]>{
        return this.http.get(environment.APIUri + '/divisas')
        .pipe(
            map(data => {
                let items: Array<IDivisa> = [];
                for (const id in Object.keys(data)){
                    const _item: IDivisa = Object.values(data)[id];
                    items.push(_item);
                }
                return items;
            })
        );
    }

    getOne(id: any): Observable<IDivisa>{
        return this.http.get(environment.APIUri + '/divisa/' + id)
        .pipe(
            map(data => {;
                const _item: IDivisa = Object.values(data)[0];
               this.loggerService.log(Tlog.info,"items en service en next: ");
               this.loggerService.log(Tlog.info,_item);
                return _item;
            })  
        );
    }

    deleteOne(id: any): any{

       this.loggerService.log(Tlog.info,"items en service delete: entrando ");
       this.loggerService.log(Tlog.info,"id="+ id);

        return this.http.delete(environment.APIUri + '/divisa/' + id)
            .pipe( map(data =>{
               this.loggerService.log(Tlog.info,"items en service delete: saliendo ");
               this.loggerService.log(Tlog.info,"id="+ id);
            })            
        );        
    }

    create(data: any): Observable<any>{

       this.loggerService.log(Tlog.info,"items en service create: entrando ");
       this.loggerService.log(Tlog.info,"data="+ data);

        return this.http.post(environment.APIUri + '/divisa',data)
            .pipe( map(data =>{
               this.loggerService.log(Tlog.info,"returned id="+ data);               
            })            
        );        
    }

    update(data: any, id: number): Observable<any>{

       this.loggerService.log(Tlog.info,"items en service update: entrando ");
       this.loggerService.log(Tlog.info,"data="+ data);

        return this.http.put(environment.APIUri + '/divisa/' + id, data)
            .pipe( map(data =>{                
            })            
        );        
    }


}
