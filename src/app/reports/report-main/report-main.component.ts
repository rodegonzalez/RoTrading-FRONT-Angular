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
    Accountid: 0,
    Tickerid: 0,
    Pattern1id: 0,
    Patter2id: "not-set",
    Setup1id: "not-set",
    Setup2id: 0,
    Buysell: "not-set"
  };

  totalOperations: number = 0;
  totalOperations_positive: number = 0;
  totalOperations_positive_ticks: number = 0;
  totalOperations_positive_ticks_percentage: number = 0;
  total_positive_ticks: number = 0;

  totalOperations_negative: number = 0;
  totalOperations_negative_ticks: number = 0;  
  totalOperations_negative_ticks_percentage: number = 0;  
  total_negative_ticks: number = 0;

  R = 0;
  esperanza = 0;

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
    //this.loggerService.log(Tlog.info, 'onSubmit: formData:');
    //this.loggerService.log(Tlog.info, this.formData);
    this.reportService.getPositionsSearch(this.formData).subscribe(data => {
      this.showDataTable("tableReports", data as IDataTable);
      this.showStats(data as IDataTable);
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

  showStats(_data: IDataTable) {
    //this.loggerService.log(Tlog.info, "tableData.length=");
    //this.loggerService.log(Tlog.info, _data.tableData.length);

    this.totalOperations = _data.tableData.length;
    this.totalOperations_positive= 9999999;
    this.totalOperations_positive_ticks= 0;
    this.totalOperations_positive_ticks_percentage = 0;
    this.total_positive_ticks = 0;

  this.totalOperations_negative= 4444444;
  this.totalOperations_negative_ticks= 0;  
  this.totalOperations_negative_ticks_percentage= 0;  
  this.total_negative_ticks = 0;

    this.R = 0;
    this.esperanza = 0
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
