import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-an-report-operations',
  templateUrl: './an-report-operations.component.html',
  styles: []
})
export class AnReportOperationsComponent implements OnInit {

  
  constructor() { }

  ngOnInit() {
    
    // Registrar todos los componentes necesarios de chart.js
    Chart.register(...registerables);

    this.OperationsTicksChart();
    this.OperationsPosNegChart();

  } // ngOnInit
    
  // -----------------------------------------------
  OperationsTicksChart(){
    const data = {
      labels: ["Profit ticks","Loss ticks"],
      //labels: [1,2,3,4,5,6,7],
      datasets: [{
        label: 'Operaciones realizadas',
        data: [1100, 220],
        backgroundColor: [
          'lightgreen','rgba(255, 99, 132, 0.7)'
        ],
        borderColor: [
          'green','red'
        ],
      }]
    };

    const config = {
      type: 'pie' as const, // Provide a valid chart type here, such as 'bar', 'line', 'pie', etc.
      data: data,
    };

    const myChart = new Chart(
      document.getElementById('myOperationsTicksChart') as HTMLCanvasElement,
      config
    );

    myChart.resize(200, 200)

  }

  // -----------------------------------------------
  OperationsPosNegChart(){
    const data = {
      labels: ["Positivas","Negativas", "BreakEven"],
      //labels: [1,2,3,4,5,6,7],
      datasets: [{
        label: 'Operaciones realizadas',
        data: [10, 32, 4],
        backgroundColor: [
          'lightgreen','rgba(255, 99, 132, 0.7)', 'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
          'green','red','brown'
        ],
      }]
    };

    const config = {
      type: 'doughnut' as const, // Provide a valid chart type here, such as 'bar', 'line', 'pie', etc.
      data: data,
    };

    const myChart = new Chart(
      document.getElementById('myOperationsPosNegChart') as HTMLCanvasElement,
      config
    );

    myChart.resize(200, 200)
  }

} // end class