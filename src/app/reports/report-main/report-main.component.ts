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

  constructor(private loggerService: LoggerService) { 
  }

  ngOnInit(): void {
    $(document).ready(function() {
      $('#example').DataTable();     
    });
  }

  getData1() {
    this.loggerService.log(Tlog.info,'getData1');

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

    this.showDataTable("table1", tableData, columns);
  }

  getData2() {
    this.loggerService.log(Tlog.info,'getData2');

    let columns = [
      { title: 'Name', data: 'name' },
      { title: 'Position', data: 'position' },
      { title: 'Office', data: 'office' },
      { title: 'Age', data: 'age' },
      { title: 'Salario', data: 'salary' }
    ];

    let tableData = [
      { name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', age: 61, salary: '$320,800' },
      { name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', age: 63, salary: '$170,750' },      
    ];

    this.showDataTable("table2", tableData, columns);
  }

  dropTable(id: string) {
    var table = $('#' + id).DataTable({
      retrieve: true,
      paging: false
    });
    table.destroy();    
  }

  createTable(id: string) {
    //$('#' + id).DataTable();
    $('#myTable').html(`<table id="` + id + `" class="display" style="width:100%"></table>`);
  }

  getChildElementId(parentId: string, childSelector: string): string {
    return $('#' + parentId).find(childSelector).attr('id') || '';
  }

  showDataTable(id: string, data: any[], columns: any[]) {
    let oldid = this.getChildElementId('myTable', 'table');
    //this.loggerService.log(Tlog.info, 'ID del elemento hijo:'+ oldid);

    this.dropTable(oldid);
    this.createTable(id);
    $('#' + id).DataTable({
      data: data,
      columns: columns,
    });
  }


}// end class
