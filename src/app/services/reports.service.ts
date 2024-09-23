import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    getPositionsTest(): IDataTable {
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
    
    getPositions(): Observable<IDataTable>{
        return this.http.get(environment.APIUri + '/reports/getPositions')
        .pipe(
            map(data => {
                return data as IDataTable;
            })
        );
    }
 
    getPositionsSearchTest(options?: ISearchOptions): Observable<IDataTable>{           
        options = {
            Datemin: '2023-01-01',
            Datemax: '2024-12-31',
            Dateyear: '2024',
            Temporality: 'm5', // pattern2: m1, m3, m5
            Pattern1id: 'Giro', // Giro, Facilidad, Cont
            Setup2id: 1, // FV, VD, 
            Buysell: 'buy', // buy, sell
        };

        const uri = `${environment.APIUri}/reports/getPositionsSearch`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
          });    
        const optionsJson = JSON.stringify(options);
        const params = new HttpParams().set('options', optionsJson);

        return this.http.post<IDataTable>(uri, null, { headers, params })
        .pipe(
            map(data => {
            return data as IDataTable;
            })
        );        
    }

    getPositionsSearch(formData: any): Observable<IDataTable> {
        // Serializar el objeto formData a JSON
        const body = JSON.stringify(formData);
    this.loggerService.log(Tlog.info, 'getPositionsSearch - body');
    this.loggerService.log(Tlog.info, body);

        // Configuración de los headers
        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
    
        // URL de la API
        const uri = `${environment.APIUri}/reports/getPositionsSearch`;
    
        const params = new HttpParams().set('options', body);

        return this.http.post<IDataTable>(uri, null, { headers, params })
      }

} // end class
