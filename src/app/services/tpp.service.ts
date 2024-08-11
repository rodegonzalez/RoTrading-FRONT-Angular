import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, observable, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ITpp } from '../interfaces/ITpp.interface';
import { environment } from '../environment/global.environment';
import { LoggerService, Tlog } from '../services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class TppService {

    //accounts: IAccount[] = []

    constructor(private http:HttpClient
        , private router: Router
        , private loggerService: LoggerService) { }

    getAll(): Observable<ITpp[]>{
        return this.http.get(environment.APIUri + '/tpps')
        .pipe(
            map(data => {
                let items: Array<ITpp> = [];
                for (const id in Object.keys(data)){
                    const _item: ITpp = Object.values(data)[id];
                    items.push(_item);
                }
                return items;
            })
        );
    }

    getOne(id: any): Observable<ITpp>{
        return this.http.get(environment.APIUri + '/tpp/' + id)
        .pipe(
            map(data => {
                const _item: ITpp = Object.values(data)[0];
                return _item;
            })  
        );
    }

    deleteOne(id: any): any{

       this.loggerService.log(Tlog.info,"items en service delete: entrando ");
       this.loggerService.log(Tlog.info,"id="+ id);

        return this.http.delete(environment.APIUri + '/tpp/' + id)
            .pipe( map(data =>{
               this.loggerService.log(Tlog.info,"items en service delete: saliendo ");
               this.loggerService.log(Tlog.info,"id="+ id);
            })            
        );        
    }

    create(data: any): Observable<any>{

       this.loggerService.log(Tlog.info,"items en service create: entrando ");
       this.loggerService.log(Tlog.info,"data="+ data);

        return this.http.post(environment.APIUri + '/tpp',data)
            .pipe( map(data =>{
               this.loggerService.log(Tlog.info,"returned id="+ data);               
            })            
        );        
    }

    update(data: any, id: number): Observable<any>{

       this.loggerService.log(Tlog.info,"items en service update: entrando ");
       this.loggerService.log(Tlog.info,"data="+ data);

        return this.http.put(environment.APIUri + '/tpp/' + id, data)
            .pipe( map(data =>{                
            })            
        );        
    }


}
