import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { LoggerService, Tlog } from '../../services/logger.service';


@Component({
  selector: 'app-report-main',
  templateUrl: './report-main.component.html',
  styles: [
  ]
})
export class ReportMainComponent {

  columns: any[] = [
    { title: 'Nombre', data: 'name' },
    { title: 'Posición', data: 'position' },
    { title: 'Oficina', data: 'office' },
    { title: 'Edad', data: 'age' },
    { title: 'Fecha de inicio', data: 'startDate' },
    { title: 'Salario', data: 'salary' }
  ];

  constructor(private loggerService: LoggerService) { 
  }

  ngOnInit(): void {
    $(document).ready(function() {
      $('#example').DataTable();     
    });
  }

  getData1() {
    this.loggerService.log(Tlog.info,'getData1');

    let tableData = [
      { name: 'Juan', position: 'Jardinero', office: 'Agaete', age: 61, startDate: '2011/04/25', salary: '480€' },
      { name: 'Matias', position: 'Barrendero', office: 'Gáldar', age: 63, startDate: '2011/07/25', salary: '400€' },      
    ];

    this.showDataTable(tableData, this.columns);
  }

  getData2() {
    this.loggerService.log(Tlog.info,'getData2');

    let tableData = [
      { name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', age: 61, startDate: '2011/04/25', salary: '$320,800' },
      { name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', age: 63, startDate: '2011/07/25', salary: '$170,750' },      
    ];

    this.showDataTable(tableData, this.columns);
  }

  dropTable() {
    var table = $('#example').DataTable({
      retrieve: true,
      paging: false
    });
    table.destroy();
  }

  showDataTable(data: any[], columns: any[]) {
    this.dropTable();
    $('#example').DataTable({
      data: data,
      columns: columns,
    });
  }


}// end class
