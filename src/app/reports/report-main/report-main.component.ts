import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoggerService, Tlog } from '../../services/logger.service';
import { ReportsService } from '../../services/reports.service';
import 'datatables.net';
import { IDataTable } from '../../interfaces/IDataTable.interface';
import { Chart, ChartType, registerables } from 'chart.js';
import { TradingStats } from '../../shared/trading-stats';

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
  totalPercent: number = 0;
  totalValue: number = 0;
  totalMedia: number = 0;

  Ratio_R = 0;
  esperanza_matematica = 0;


  profit_num: number = 0;
  profit_total_ticks: number = 0;
  profit_media_ticks: number = 0;
  profit_num_percent : number = 0;

  loss_num: number = 0;
  loss_total_ticks: number = 0;
  loss_media_ticks: number = 0;
  loss_num_percent : number = 0;

  be_num: number = 0;
  be_total_ticks: number = 0;
  be_media_ticks: number = 0;
  be_num_percent : number = 0;

  profit_num_percent_display : number = 0;
  loss_num_percent_display : number = 0;
  be_num_percent_display : number = 0;
  totalPercent_display : number = 0;
  
  constructor(
    private loggerService: LoggerService,
    private reportService: ReportsService) { 
  }

  ngOnInit(): void {
     // Registrar todos los componentes necesarios de chart.js
     Chart.register(...registerables);
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

      this.loggerService.log(Tlog.info, 'onSubmit: data returned:');
      this.loggerService.log(Tlog.info, data);



      /*  ==============  *//*  ==============  *//*  ==============  *//*  ==============  */
      /*  ==============  *//*  ==============  */
      /*  ==============  *//*  ==============  */

      this.showDataTable("tableReports", data as IDataTable);
      this.showStats(data as IDataTable);
      this.showCharts(data as IDataTable);
      
      /*  ==============  *//*  ==============  */
      /*  ==============  *//*  ==============  */
      /*  ==============  *//*  ==============  *//*  ==============  *//*  ==============  */


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

  // Table
  showDataTable(id: string, _data: IDataTable) {
    this.dropTable();
    this.createTable(id);
    const tableElement = this.myTable.nativeElement.querySelector('#' + id);
    $(tableElement).DataTable({
      data: _data.tableData,
      columns: _data.tableColumns,  
    });    
  }

  // ----------------------------
  // Charts
  showCharts(_data: IDataTable) {
    //this.loggerService.log(Tlog.info, "showCharts _data=");
    //this.loggerService.log(Tlog.info, _data);

    this.positionsData_operations(_data.summarize);
    //this.showCharts_PositionsData_blocks(_data);
    this.positionsData_ticks();
    this.positionsData_posneg();
  }

  positionsData_operations(_data: any) {
    //this.loggerService.log(Tlog.info, "positionsData_operations _data=");
    //this.loggerService.log(Tlog.info, _data.positionsData_operations);
    this.showChart("myreportChart_operations_bar", _data.positionsData_operations, 'bar' as ChartType);  
  }

  showCharts_PositionsData_blocks(_data: any) {
    //this.loggerService.log(Tlog.info, "showCharts_PositionsData_blocks _data=");
    //this.loggerService.log(Tlog.info, _data.summarize.positionsData_blocks);
    //this.showChart("myreportChart_PositionsData_blocks", _data.summarize.positionsData_blocks, 'bar' as ChartType);
  }
  positionsData_ticks() {
    let data = {
      chartLabels: ['ProfitTicks', 'LossTicks', 'BreakEvenTicks'],
      chartData: [Math.abs(Number(this.profit_total_ticks)), Math.abs(Number(this.loss_total_ticks)) , Math.abs(Number(this.be_total_ticks))]
    };
    
    //this.loggerService.log(Tlog.info, "positionsData_ticks _data=");
    //this.loggerService.log(Tlog.info, data);
    this.showChartColored("myreportChart_ticks_pie", data, 'pie' as ChartType);
  }
  positionsData_posneg() {
    let data = {
      chartLabels: ['ProfitTicks', 'LossTicks', 'BreakEvenTicks'],
      chartData: [Math.abs(Number(this.profit_num)), Math.abs(Number(this.loss_num)) , Math.abs(Number(this.be_num))]
    };

    //this.loggerService.log(Tlog.info, "positionsData_posneg _data=");
    //this.loggerService.log(Tlog.info, data);
    this.showChartColored("myreportChart_posneg_pie", data, 'doughnut' as ChartType);
  
  }




  private charts: { [key: string]: Chart } = {}; // Almacena los gráficos por ID de canvas
  DeleteChart(_canvasId: string) {
    const canvas = document.getElementById(_canvasId) as HTMLCanvasElement;
    if (!canvas) {
      console.error(`Canvas with ID ${_canvasId} not found.`);
      return;
    }

    // Destruir el gráfico existente si ya existe
    if (this.charts[_canvasId]) {
      this.charts[_canvasId].destroy();
      delete this.charts[_canvasId]; // Eliminar la referencia del objeto charts
    }

    // Limpiar el canvas
    const context = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  showChart( _canvasId: string, _data: any, _type: ChartType) {     
    this.DeleteChart(_canvasId);

    //this.loggerService.log(Tlog.info, "showChart _labels=");
    //this.loggerService.log(Tlog.info, _data.chartLabels);
    //this.loggerService.log(Tlog.info, "showChart _data=");
    //this.loggerService.log(Tlog.info, _data.chartData);

    const data = {
      labels: _data.chartLabels,
      datasets: [{
        label: 'Operaciones realizadas',
        data: _data.chartData,
        backgroundColor: _data.chartData.map((value: number) => value > 0 ? 'lightgreen' : 'rgba(255, 99, 132, 0.7)'), // Verde para valores > 0, rojo sangre para valores < 0
        borderColor: _data.chartData.map((value: number) => value >= 0 ? 'green' : 'red'), // Verde para valores > 0, rojo sangre para valores < 0
        borderWidth: 1,
      }]
    };

    const config = {
      type: _type  , // Provide a valid ChartType here, such as 'bar', 'line', 'pie', 'doughnut'etc.
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      },
    };


    /*
    const chartElement = document.getElementById(_canvasId) as HTMLCanvasElement;
    if (chartElement) {
      const myChart = new Chart(chartElement, config);
      //myChart.resize(0,240);
    } else {
      this.loggerService.log(Tlog.error, "Elemento con ID 'myreportChart_operations' no encontrado.");
    }
    */

    const canvas = document.getElementById(_canvasId) as HTMLCanvasElement;
    if (!canvas) {
      console.error(`Canvas with ID ${_canvasId} not found.`);
      return;
    }
    // Crear un nuevo gráfico
    this.charts[_canvasId] = new Chart(canvas, {
      type: _type,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });



  }

  // Designd for profit/loss/BreakEven charts: only 3 values IN THIS ORDER! for green, red, brown colors, no axis
  showChartColored( _canvasId: string, _data: any, _type: ChartType) {     
    this.DeleteChart(_canvasId);

    //this.loggerService.log(Tlog.info, "showChart _labels=");
    //this.loggerService.log(Tlog.info, _data.chartLabels);
    //this.loggerService.log(Tlog.info, "showChart _data=");
    //this.loggerService.log(Tlog.info, _data.chartData);

    const data = {
      labels: _data.chartLabels,
      datasets: [{
        label: 'Operaciones realizadas',
        data: _data.chartData,
        backgroundColor: [
          'lightgreen','rgba(255, 99, 132, 0.7)','rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
          'green','red','brown'
        ],
      }]
    };

    const config = {
      type: _type  , // Provide a valid ChartType here, such as 'bar', 'line', 'pie', 'doughnut'etc.
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true // Mostrar la leyenda del gráfico
          }
        },
        scales: {
          x: {
            display: false // Ocultar el eje X
          },
          y: {
            display: false // Ocultar el eje Y
          }
        }
      },
    };

    /*
    const chartElement = document.getElementById(_canvasId) as HTMLCanvasElement;
    if (chartElement) {
      const myChart = new Chart(chartElement, config);
      //myChart.resize(0,240);
    } else {
      this.loggerService.log(Tlog.error, "Elemento con ID 'myreportChart_operations' no encontrado.");
    }
    */
    
    const canvas = document.getElementById(_canvasId) as HTMLCanvasElement;
    if (!canvas) {
      console.error(`Canvas with ID ${_canvasId} not found.`);
      return;
    }
    // Crear un nuevo gráfico
    this.charts[_canvasId] = new Chart(canvas, {
      type: _type,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });


  }


  ratioProfitLoss: number = 0;

  // ----------------------------
  // Stats
  showStats(_data: IDataTable) {
    this.showStats_count(_data.summarize);
  }


  /* ==============  *//*  ==============  *//*  ==============  *//*  ==============  */
  /* ==============  *//*  ==============  *//*  ==============  *//*  ==============  */
  showStats_count(_data: any) {

    //this.loggerService.log(Tlog.info, "showStats_count: _data:");
    this.loggerService.log(Tlog.info, _data);

    if (_data.positionsData_operations && Array.isArray(_data.positionsData_operations.chartData)) {
      let data = _data.positionsData_operations.chartData;
      //this.loggerService.log(Tlog.info, "showStats_count: _data2:");
      //this.loggerService.log(Tlog.info, data);

      this.profit_num = 0;
      this.profit_total_ticks = 0;  
      this.profit_num_percent = 0;

      this.loss_num = 0;
      this.loss_total_ticks = 0;
      this.be_num = 0;
      this.loss_num_percent = 0;

      this.be_total_ticks = 0;
      this.be_media_ticks = 0;
      this.be_num_percent = 0;

      this.totalOperations = 0;
      this.Ratio_R = 0;
      this.esperanza_matematica = 0      



      if (Array.isArray(data)) 
        {
        data.forEach((value, index) => {
                //this.loggerService.log(Tlog.info, `Processing value at index ${index}: ${value}`);
                if (typeof value === 'number') {
                  this.totalOperations += 1;
                  this.totalValue += value;
                  if ((value >= 0) && (value <= 10)) {
                    this.be_total_ticks += value;
                    this.be_num += 1;
                  } else if (value > 10) {
                    this.profit_total_ticks += value;
                    this.profit_num += 1;
                  } else if (value < 0) {
                    this.loss_total_ticks += value;
                    this.loss_num += 1;
                  }
                } else {
                  this.loggerService.log(Tlog.error, `Value at index ${index} is not a number: ${value}`);
                }
        });

        const stats = new TradingStats(
            this.totalOperations, 
            this.profit_num, 
            this.loss_num, 
            this.profit_total_ticks, 
            this.loss_total_ticks,
            this.be_num,
            this.be_total_ticks);

        this.profit_media_ticks = stats.getAverageGain();
        this.loss_media_ticks =  stats.getAverageLoss();
        this.be_media_ticks = stats.getAverageBE();
        this.totalMedia = stats.getAverageTotal();

        this.profit_num_percent = stats.getWinProbability();
        this.loss_num_percent = stats.getLossProbability();
        this.be_num_percent = stats.getBEProbability();

        this.totalPercent = stats.getTotalProbability();
        this.totalValue = stats.getTotalValue();

        this.profit_num_percent_display = this.profit_num_percent * 100;
        this.loss_num_percent_display = this.loss_num_percent * 100;
        this.be_num_percent_display = this.be_num_percent * 100;
        this.totalPercent_display = this.totalPercent * 100;

        this.Ratio_R = stats.calculateRRatio();
        this.esperanza_matematica = stats.calculateExpectancy();

      } else {
        this.loggerService.log(Tlog.error, 'chartData is not an array.');
      }

    }  else {
      this.loggerService.log(Tlog.error, 'Los valores de _data no son un array.');
    }
  }

  // ----------------------------

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
