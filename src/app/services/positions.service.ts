import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPosition } from '../interfaces/IPosition.interface';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

    //positions: IPosition[] = []

    constructor(private http:HttpClient) { }

    getAll(): Observable<IPosition[]>{

        return this.http
        .get('http://localhost:8080/api/positions')
        .pipe(
            map(data => {
                const positions: Array<IPosition> = [];
                const mydata = Object.values(data)[0];
                for (const id in mydata){
                    positions.push(mydata[id]);
                }
                return positions;
            })
        );
    }

}
