import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, observable, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ITpp } from '../interfaces/ITpp.interface';
import { environment } from '../environment/global.environment';

@Injectable({
  providedIn: 'root'
})
export class TppService {

    //accounts: IAccount[] = []

    constructor(private http:HttpClient,private router: Router) { }

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

    //getOne(id: any): Observable<ITpp[]>{
    getOne(id: any): Observable<ITpp>{
        return this.http.get(environment.APIUri + '/tpp/' + id)
        .pipe(
            map(data => {
                //let items: Array<ITpp> = [];
                const _item: ITpp = Object.values(data)[0];
                //items.push(_item);
                console.log("items en service en next: ");
                console.log(_item);
                //return items;
                return _item;
            })  
        );
    }

    deleteOne(id: any): any{

        console.log("items en service delete: entrando ");
        console.log("id="+ id);

        return this.http.delete(environment.APIUri + '/tpp/' + id)
            .pipe( map(data =>{
                console.log("items en service delete: saliendo ");
                console.log("id="+ id);
            })            
        );        
    }

    create(data: any): Observable<any>{

        console.log("items en service create: entrando ");
        console.log("data="+ data);

        return this.http.post(environment.APIUri + '/tpp',data)
            .pipe( map(data =>{
                console.log("returned id="+ data);               
            })            
        );        
    }

    update(data: any, id: number): Observable<any>{

        console.log("items en service update: entrando ");
        console.log("data="+ data);

        return this.http.put(environment.APIUri + '/tpp/' + id, data)
            .pipe( map(data =>{                
            })            
        );        
    }


}
