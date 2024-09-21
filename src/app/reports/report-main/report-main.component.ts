import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoggerService, Tlog } from '../../services/logger.service';
import { ReportsService } from '../../services/reports.service';
import 'datatables.net';

@Component({
  selector: 'app-report-main',
  templateUrl: './report-main.component.html',
  styles: [
  ]
})
export class ReportMainComponent implements OnInit {

  @ViewChild('myTable', { static: true }) myTable!: ElementRef;

  constructor(
    private loggerService: LoggerService,
    private reportService: ReportsService) { 
  }

  ngOnInit(): void {
    // empty default table
    this.showDataTable("default", [], []);
  }

  getData1() {
    this.loggerService.log(Tlog.info, 'getData1');
    let data = this.reportService.testGetTable1();
    this.loggerService.log(Tlog.info, data);
    this.showDataTable("table1", data.tableData, data.columns);
  }

  getData2() {
    this.loggerService.log(Tlog.info, 'getData2');
    let data = this.reportService.testGetTable2();
    this.loggerService.log(Tlog.info, data);
    this.showDataTable("table2", data.tableData, data.columns);
  }

  dropTable(id: string) {
    const tableElement = this.myTable.nativeElement.querySelector('#' + id);
    if ($.fn.DataTable.isDataTable(tableElement)) {
      $(tableElement).DataTable().destroy();
      tableElement.innerHTML = ''; // Limpia el contenido de la tabla
    }
  }

  createTable(id: string) {
    this.myTable.nativeElement.innerHTML = `<table id="${id}" class="display" style="width:100%"></table>`;
  }

  showDataTable(id: string, data: any[], columns: any[]) {
    this.dropTable(id);
    this.createTable(id);
    const tableElement = this.myTable.nativeElement.querySelector('#' + id);
    $(tableElement).DataTable({
      data: data,
      columns: columns,
    });
  }

  getChildElementId(parentId: string, childSelector: string): string {
    const parentElement = this.myTable.nativeElement.querySelector('#' + parentId);
    const childElement = parentElement.querySelector(childSelector);
    return childElement ? childElement.id : '';
  }

  getData() {
    this.loggerService.log(Tlog.info, 'getData');
  }

} // end class