import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { LoggerService, Tlog } from '../../services/logger.service';
import { ReportsService } from '../../services/reports.service';


@Component({
  selector: 'app-report-main',
  templateUrl: './report-main.component.html',
  styles: [
  ]
})
export class ReportMainComponent {

  constructor(
    private loggerService: LoggerService,
    private reportService: ReportsService) { 
  }

  ngOnInit(): void {
    $(document).ready(function() {
      $('#example').DataTable();     
    });
  }

  // ----------------------------------------------------------
  // ----------------------------------------------------------

  getData1() {
    let data = this.reportService.testGetTable1();
    this.showDataTable("table1", data.columns, data.tableData);
  }

  getData2() {
    let data = this.reportService.testGetTable2();
    this.showDataTable("table2", data.columns, data.tableData);
  }

  // ----------------------------------------------------------
  // ----------------------------------------------------------

  dropTable(id: string) {
    if ($.fn.DataTable.isDataTable('#' + id)) {
      $('#' + id).DataTable().destroy();
      $('#' + id).empty(); // Limpia el contenido de la tabla
    }
  }

  createTable(id: string) {
    $('#myTable').html(`<table id="` + id + `" class="display" style="width:100%"></table>`);
  }

  getChildElementId(parentId: string, childSelector: string): string {
    return $('#' + parentId).find(childSelector).attr('id') || '';
  }

  showDataTable(id: string, columns: any[], data: any[]) {
    let oldid = this.getChildElementId('myTable', 'table');
    this.dropTable(oldid);

    this.createTable(id);
    $('#' + id).DataTable({
      data: data,
      columns: columns,
    });
  }

}// end class
