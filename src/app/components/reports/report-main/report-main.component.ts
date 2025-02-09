import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoggerService, Tlog } from '../../../services/logger.service';
import { ReportsService } from '../../../services/reports.service';
import { AccountsService } from '../../../services/accounts.service';
import { PositionHighPatternsService } from '../../../services/position_patterns.service';
import { PositionSetupsService } from '../../../services/position_setups.service';
import { TickerService } from '../../../services/ticker.service';
import 'datatables.net';
import { IDataTable } from '../../../interfaces/IDataTable.interface';
import { IAccount } from '../../../interfaces/IAccount.interface';
import { ITicker } from '../../../interfaces/ITicker.interface';
import { IPositionHighPattern } from '../../../interfaces/IPositionPattern.interface';
import { IPositionSetup } from '../../../interfaces/IPositionSetup.interface';
import { Chart, ChartType, registerables } from 'chart.js';
import { TradingStats } from '../../../shared/trading-stats';
import { DecimalPipe } from '@angular/common';

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
  total_media: number = 0;

  Ratio_R = 0;
  esperanza_matematica = 0;
  Ratio_WinLoss : number = 0;

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
  
  ratioProfitLoss: number = 0;

  accounts: IAccount[] = [];
  tickers: ITicker[] = [];
  hpatterns: IPositionHighPattern[] = [];
  setups: IPositionSetup[] = [];

  constructor(
    private loggerService: LoggerService,
    private reportService: ReportsService,
    private accountService: AccountsService,
    private tickerService: TickerService,
    private positionHighPatternsService: PositionHighPatternsService,
    private positionSetupsService: PositionSetupsService) { 
  }

  ngOnInit(): void {
    try {

      // Registrar todos los componentes necesarios de chart.js
      Chart.register(...registerables);

      // get data for search
      this.accountService.getAll().subscribe((data: IAccount[]) => {
        //this.loggerService.log(Tlog.info, data);
        this.accounts = data;
      });
      this.tickerService.getAll().subscribe((data: ITicker[]) => {
        //this.loggerService.log(Tlog.info, data);
        this.tickers = data;
      });
      this.positionHighPatternsService.getAll().subscribe((data: IPositionHighPattern[]) => {
        //this.loggerService.log(Tlog.info, data);
        this.hpatterns = data;
      });
      this.positionSetupsService.getAll().subscribe((data: IPositionSetup[]) => {
        //this.loggerService.log(Tlog.info, data);
        this.setups = data;
      });
     
    } catch (error) {
      this.loggerService.log(Tlog.error, error);
    }

  }

  ngAfterViewInit(): void {
    const table = $(this.defaultDataTable.nativeElement).DataTable();
     // Configurar el evento de cambio de página para activar los buttons
     table.on('page.dt', () => {
      this.activateDynamicButtons();
    });
  }

/*  ==============  *//*  ==============  *//*  ==============  *//*  ==============  */

// Buttons

  getPositionsTest() {
    const data: IDataTable = this.reportService.getPositionsTest();
    //this.loggerService.log(Tlog.info, data);
    this.showDataTable("tableReports", data as IDataTable);
    this.showStats(data as IDataTable);
    this.showCharts(data as IDataTable);
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    this.reportService.getPositionsSearch(this.formData).subscribe(data => {

      /*  ==============  *//*  ==============  *//*  ==============  *//*  ==============  */
      //this.loggerService.log(Tlog.info, data);
      this.showDataTable("tableReports", data as IDataTable);
      this.showStats(data as IDataTable);
      this.showCharts(data as IDataTable);
      
      /*  ==============  *//*  ==============  *//*  ==============  *//*  ==============  */

    });
  }

/*  ==============  *//*  ==============  *//*  ==============  *//*  ==============  */

// DataTables

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

  // activate buttons from back
  activateDynamicButtons() {    
    const buttonContainer = this.getTableContainer();
    if (buttonContainer) {
          $(buttonContainer).on('click', 'button', (event) => {
            const buttonId = (event.target as HTMLElement).id;
            this.verID(buttonId.replace('button', ''));
          });
        } else {
          this.loggerService.log(Tlog.error, "buttonContainer defaultDataTable is null. Report buttons not activated.");
        }
  }

  showDataTable(id: string, _data: IDataTable) {
    this.dropTable();
    this.createTable(id);
    const tableElement = this.myTable.nativeElement.querySelector('#' + id);
    $(tableElement).DataTable({
      data: _data.tableData,
      columns: _data.tableColumns,  
    });
    this.activateDynamicButtons();    
  }

/*  ==============  *//*  ==============  *//*  ==============  *//*  ==============  */

  // Charts

  showCharts(_data: IDataTable) {
    this.positionsData_operations(_data.summarize);
    this.positionsData_ticks();
    this.positionsData_posneg();
  }

  positionsData_operations(_data: any) {
    this.showChart("myreportChart_operations_bar", _data.positionsData_operations, 'bar' as ChartType);  
  }

  positionsData_ticks() {
    let data = {
      chartLabels: ['ProfitTicks', 'LossTicks', 'BreakEvenTicks'],
      chartData: [Math.abs(Number(this.profit_total_ticks)), Math.abs(Number(this.loss_total_ticks)) , Math.abs(Number(this.be_total_ticks))]
    };
    this.showChartColored("myreportChart_ticks_pie", data, 'pie' as ChartType);
  }
  
  positionsData_posneg() {
    let data = {
      chartLabels: ['ProfitTicks', 'LossTicks', 'BreakEvenTicks'],
      chartData: [Math.abs(Number(this.profit_num)), Math.abs(Number(this.loss_num)) , Math.abs(Number(this.be_num))]
    };
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
    this.charts[_canvasId].resize(200,200);

  }

  // Designd for profit/loss/BreakEven charts: only 3 values IN THIS ORDER! for green, red, brown colors, no axis
  showChartColored( _canvasId: string, _data: any, _type: ChartType) {     
    this.DeleteChart(_canvasId);

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
    this.charts[_canvasId].resize(200,200);

  }

/*  ==============  *//*  ==============  *//*  ==============  *//*  ==============  */

// Stats

  showStats(_data: IDataTable) {
    this.showStats_count(_data.summarize);
  }

  showStats_count(_data: any) {
    if (_data.positionsData_operations && Array.isArray(_data.positionsData_operations.chartData)) {
      let data = _data.positionsData_operations.chartData;

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
        this.total_media = stats.getAverageTotal();

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
        this.Ratio_WinLoss = stats.calculateWinLossRatio();

      } else {
        this.loggerService.log(Tlog.error, 'chartData is not an array.');
      }

    }  else {
      this.loggerService.log(Tlog.error, 'Los valores de _data no son un array.');
    }
  }

/*  ==============  *//*  ==============  *//*  ==============  *//*  ==============  */

// Auxiliar

  getChildElementId(parentId: string, childSelector: string): string {
    const parentElement = this.myTable.nativeElement.querySelector('#' + parentId);
    const childElement = parentElement.querySelector(childSelector);
    return childElement ? childElement.id : '';
  }

  getData() {
    this.loggerService.log(Tlog.info, 'getData');
  }

  verID(id: any){
    this.loggerService.log(Tlog.info, "verID - Id="+id);
  } 

/*  ==============  *//*  ==============  *//*  ==============  *//*  ==============  */

} // end class
