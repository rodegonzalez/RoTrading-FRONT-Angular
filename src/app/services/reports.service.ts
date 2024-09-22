import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environment/global.environment';
import { LoggerService, Tlog } from './logger.service';
import { IDataTable, ISearchOptions } from '../interfaces/IDataTable.interface';
import { IPositionView } from '../interfaces/IPosition.interface';
import { SearchOptions } from 'datatables.net';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

    constructor(private http:HttpClient
        , private loggerService: LoggerService) { }

    testGetTable1(): IDataTable {
        let tableColumns = [
            { title: 'Nombre', data: 'name' },
            { title: 'Posición', data: 'position' },
            { title: 'Oficina', data: 'office' },
            { title: 'Edad', data: 'age' },
            { title: 'Fecha de inicio', data: 'startDate' },
            { title: 'Salario', data: 'salary' }
        ];

        let tableData = [
            { name: 'Juan', position: 'Jardinero', office: 'Agaete', age: 61, startDate: '2011/04/25', salary: '480€' },
            { name: 'Matias', position: 'Barrendero', office: 'Gáldar', age: 63, startDate: '2011/07/25', salary: '400€' },   
            { name: 'Juan', position: 'Jardinero', office: 'Agaete', age: 61, startDate: '2011/04/25', salary: '480€' },
            { name: 'Matias', position: 'Barrendero', office: 'Gáldar', age: 63, startDate: '2011/07/25', salary: '400€' },   
            { name: 'Alberto', position: 'Jardinero', office: 'Agaete', age: 61, startDate: '2011/04/25', salary: '480€' },
            { name: 'Matias', position: 'Barrendero', office: 'Gáldar', age: 63, startDate: '2011/07/25', salary: '400€' },   
            { name: 'Espeucipo', position: 'Jardinero', office: 'Agaete', age: 61, startDate: '2011/04/25', salary: '480€' },
            { name: 'Gorgias', position: 'Barrendero', office: 'Gáldar', age: 63, startDate: '2011/07/25', salary: '400€' },   
            { name: 'Protágoras', position: 'Jardinero', office: 'Agaete', age: 61, startDate: '2011/04/25', salary: '480€' },
            { name: 'Empédocles', position: 'Barrendero', office: 'Gáldar', age: 63, startDate: '2011/07/25', salary: '400€' },   
            
            { name: 'Sexto Empírico', position: 'Jardinero', office: 'Agaete', age: 61, startDate: '2011/04/25', salary: '480€' },
            { name: 'Eratóstenes', position: 'Barrendero', office: 'Gáldar', age: 63, startDate: '2011/07/25', salary: '400€' },   
            { name: 'Juancho', position: 'Jardinero', office: 'Agaete', age: 61, startDate: '2011/04/25', salary: '480€' },
            { name: 'Matias Jorge', position: 'Barrendero', office: 'Gáldar', age: 63, startDate: '2011/07/25', salary: '400€' },   
            { name: 'Séneca', position: 'Jardinero', office: 'Agaete', age: 61, startDate: '2011/04/25', salary: '480€' },
            { name: 'Marco Aurelio', position: 'Barrendero', office: 'Gáldar', age: 63, startDate: '2011/07/25', salary: '400€' },   
            { name: 'Zenón', position: 'Jardinero', office: 'Agaete', age: 61, startDate: '2011/04/25', salary: '480€' },
            { name: 'Sócrates', position: 'Barrendero', office: 'Gáldar', age: 63, startDate: '2011/07/25', salary: '400€' },   
            { name: 'Aristóteles', position: 'Jardinero', office: 'Agaete', age: 61, startDate: '2011/04/25', salary: '480€' },
            { name: 'Platón', position: 'Barrendero', office: 'Gáldar', age: 63, startDate: '2011/07/25', salary: '400€' }, 

            { name: 'Anaximandro', position: 'Jardinero', office: 'Mileto', age: 61, startDate: '2011/04/25', salary: '480€' },
            { name: 'Tales', position: 'Barrendero', office: 'Mileto', age: 63, startDate: '2011/07/25', salary: '400€' },   
            { name: 'Posidonio', position: 'Jardinero', office: 'Agaete', age: 61, startDate: '2011/04/25', salary: '480€' },
            { name: 'Anaxágoras', position: 'Barrendero', office: 'Gáldar', age: 63, startDate: '2011/07/25', salary: '400€' },   
            { name: 'Euclides', position: 'Jardinero', office: 'Agaete', age: 61, startDate: '2011/04/25', salary: '480€' },
            { name: 'Pitágoras', position: 'Barrendero', office: 'Gáldar', age: 63, startDate: '2011/07/25', salary: '400€' },   
            { name: 'Anaxímenes', position: 'Jardinero', office: 'Mileto', age: 61, startDate: '2011/04/25', salary: '480€' },
        ];

        return {tableColumns, tableData} as IDataTable
    }
    
    testGetTable2(): IDataTable {
        let tableColumns = [
            { title: 'Name', data: 'name' },
            { title: 'Position', data: 'position' },
            { title: 'Office', data: 'office' },
            { title: 'Age', data: 'age' }
          ];
      
          let tableData = [
            { name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', age: 61},
            { name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', age: 63},      
          ];

        return {tableColumns, tableData} as IDataTable
    }

    getData_getTest(): Observable<IDataTable>{
        return this.http.get(environment.APIUri + '/reports/getTest')
        .pipe(
            map(data => {
                return data as IDataTable;
            })
        );
    }
    getPositions(): Observable<IDataTable>{
        return this.http.get(environment.APIUri + '/reports/getPositions')
        .pipe(
            map(data => {
                return data as IDataTable;
            })
        );
    }

    //getPositionsSearch(options: any): Observable<IDataTable>{   
        getPositionsSearch(options?: ISearchOptions): Observable<IDataTable>{   
        
       
        options = {
            datemin: '2023-01-01',
            datemax: '2024-12-31',
            dateyear: '2024',
            temporality: 'm5', // pattern2: m1, m3, m5
            pattern1id: 'Giro', // Giro, Facilidad, Cont
            setup2id: 1, // FV, VD, 
            buysell: 'buy', // buy, sell
        };


        if (options.datemin) {
            options.datemin = options.datemin + ' 00:00:00';
        }
        if (options.datemax) {
            options.datemax = options.datemax + ' 23:59:59';
        }
        if (options.dateyear) { 
            options.dateyear = options.dateyear + '-01-01 00:00:00';
        }

        this.loggerService.log(Tlog.info, "getPositionsSearch - Options:");
        this.loggerService.log(Tlog.info, options);

        const url = `${environment.APIUri}/reports/getPositionsSearch`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
          });
       
        
        //return this.http.post(environment.APIUri + '/reports/getPositionsSearch', { headers })
        const body = { options: options };
        //return this.http.post(url, body, { headers })  
        //const body = JSON.stringify(options);     

        this.loggerService.log(Tlog.info, "getPositionsSearch - body:");
        this.loggerService.log(Tlog.info, body);

        return this.http.post(url, body, { headers })
        .pipe(
            map(data => {
                return data as IDataTable;
            })
        );
    }

} // end class
