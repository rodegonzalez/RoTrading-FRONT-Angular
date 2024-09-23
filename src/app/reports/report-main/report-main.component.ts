import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoggerService, Tlog } from '../../services/logger.service';
import { ReportsService } from '../../services/reports.service';
import 'datatables.net';
import { IDataTable } from 'src/app/interfaces/IDataTable.interface';

@Component({
  selector: 'app-report-main',
  templateUrl: './report-main.component.html',
  styles: [
  ]
})
export class ReportMainComponent implements OnInit {

  @ViewChild('myTable', { static: true }) myTable!: ElementRef;
  @ViewChild('defaultDataTable', { static: false }) defaultDataTable!: ElementRef;
  
  formData: any = {
    Temporality: 'm5',
    Buysell: "buy"
  };

  constructor(
    private loggerService: LoggerService,
    private reportService: ReportsService) { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    $(this.defaultDataTable.nativeElement).DataTable();
  }

  getDataTest() {
    const data: IDataTable = this.reportService.getPositionsTest();
    this.showDataTable("tableTest", data);
  }

  getData_getPositions() {
    this.reportService.getPositions().subscribe(data => {
      this.showDataTable("tableReports", data as IDataTable);
    });
  }

  getData_getPositionsSearchTest() {
    this.reportService.getPositionsSearchTest().subscribe(data => {
      this.showDataTable("tableReports", data as IDataTable);
    });
  }

  getData_getPositionsSearch() {
    this.reportService.getPositionsSearch(null).subscribe(data => {
      this.showDataTable("tableReports", data as IDataTable);
    });
  }
  
  onSubmit(event: Event): void {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    this.reportService.getPositionsSearch(this.formData).subscribe(data => {
      this.showDataTable("tableReports", data as IDataTable);
    });
  }

  // ----------------------------
  //-----------------------------

  getTableContainer() {
    return this.myTable.nativeElement;
  }

  dropTable() {
    const tableElement = this.getTableContainer();
    if ($.fn.DataTable.isDataTable(tableElement)) {
      $(tableElement).DataTable().destroy();
      tableElement.innerHTML = ''; 
    }
  }

  createTable(id: string) {
    const tableContainer = (this.getTableContainer());
    tableContainer.innerHTML = `<table id="${id}" class="display" style="width:100%"></table>`;
  }

    showDataTable(id: string, _data: IDataTable) {
    this.dropTable();
    this.createTable(id);
    const tableElement = this.myTable.nativeElement.querySelector('#' + id);
    $(tableElement).DataTable({
      data: _data.tableData,
      columns: _data.tableColumns,
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

  verID(id: any){
    this.loggerService.log(Tlog.info, "Id="+id);
  } 

  // ----------------------------
  //-----------------------------




} // end class
