import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environment/global.environment';
import { LoggerService, Tlog } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

    constructor(private http:HttpClient
        , private loggerService: LoggerService) { }

    testGetTable1(): {columns: any[], tableData: any[]} {
        let columns = [
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
        ];

        return {columns, tableData}
    }
    
    testGetTable2(): {columns: any[], tableData: any[]} {
        let columns = [
            { title: 'Name', data: 'name' },
            { title: 'Position', data: 'position' },
            { title: 'Office', data: 'office' },
            { title: 'Age', data: 'age' }
          ];
      
          let tableData = [
            { name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', age: 61},
            { name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', age: 63},      
          ];

        return {columns, tableData}
    }

} // end class
