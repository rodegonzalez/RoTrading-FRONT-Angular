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

    getAllOpened(): Observable<IPosition[]>{

        return this.http
        .get('http://localhost:8080/api/positions/opened')
        .pipe(
            map(data => {
                let positions: Array<IPosition> = [];
                for (const id in Object.keys(data)){
                    const _position: IPosition = {                        
                        Idposition: Object.values(data)[id]["idposition"],
                        Creation: Object.values(data)[id]["creation"],
                        Datetimein: Object.values(data)[id]["datetimein"],
                        Datetimeout: Object.values(data)[id]["datetimeout"],
                        Buysell: Object.values(data)[id]["buysell"],
                        Pricein: Object.values(data)[id]["pricein"],
                        Priceout: Object.values(data)[id]["priceout"],
                        Ticks: Object.values(data)[id]["ticks"],
                        Contracts: Object.values(data)[id]["contracts"],
                        Commision: Object.values(data)[id]["commision"],
                        Euros: Object.values(data)[id]["euros"],
                        Dollareuro: Object.values(data)[id]["dollareuro"],
                        Imagepath: Object.values(data)[id]["imagepath"],
                        Iddivisa: Object.values(data)[id]["iddivisa"],
                        Idaccount: Object.values(data)[id]["idaccount"],
                        Status: Object.values(data)[id]["status"],
                    }
                    positions.push(_position);
                }
                return positions;
            })
        );
    }

    getAllNotOpened(): Observable<IPosition[]>{

        return this.http
        .get('http://localhost:8080/api/positions/notopened')
        .pipe(
            map(data => {
                let positions: Array<IPosition> = [];
                for (const id in Object.keys(data)){
                    const _position: IPosition = {                        
                        Idposition: Object.values(data)[id]["idposition"],
                        Creation: Object.values(data)[id]["creation"],
                        Datetimein: Object.values(data)[id]["datetimein"],
                        Datetimeout: Object.values(data)[id]["datetimeout"],
                        Buysell: Object.values(data)[id]["buysell"],
                        Pricein: Object.values(data)[id]["pricein"],
                        Priceout: Object.values(data)[id]["priceout"],
                        Ticks: Object.values(data)[id]["ticks"],
                        Contracts: Object.values(data)[id]["contracts"],
                        Commision: Object.values(data)[id]["commision"],
                        Euros: Object.values(data)[id]["euros"],
                        Dollareuro: Object.values(data)[id]["dollareuro"],
                        Imagepath: Object.values(data)[id]["imagepath"],
                        Iddivisa: Object.values(data)[id]["iddivisa"],
                        Idaccount: Object.values(data)[id]["idaccount"],
                        Status: Object.values(data)[id]["status"],
                    }
                    positions.push(_position);
                }
                return positions;
            })
        );
    }

}
