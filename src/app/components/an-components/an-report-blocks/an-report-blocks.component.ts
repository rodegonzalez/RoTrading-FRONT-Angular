import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-an-report-blocks',
  templateUrl: './an-report-blocks.component.html',
  styleUrls: ["./an-report-blocks.component.css"],
  //styleUrls: [],
})
export class AnReportBlocksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
    // Registrar todos los componentes necesarios de chart.js
    Chart.register(...registerables);

    this.BlocksChart();
    this.OperationsChart();
    
  } // ngOnInit

  // -----------------------------------------------
  OperationsChart(){
    const data = {
      labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      //labels: [1,2,3,4,5,6,7],
      datasets: [{
        label: 'Operaciones realizadas',
        data: [65, 59, -28, -32,81,65, 59, -18, 91,5,-15, -22, -18, 91,5,65, -20, -18, -20,81,55, 79, -18, -21,81],
      }]
    };

    const config = {
      type: 'bar' as const, // Provide a valid chart type here, such as 'bar', 'line', 'pie', etc.
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      },
    };

    const myChart = new Chart(
      document.getElementById('myOperationsChart') as HTMLCanvasElement,
      config
    );
  }
  // ----------------------------------------------- 
  BlocksChart(){
    const data = {
      //labels: ["B001", "B002", "B003", "B004", "B005", "B006", "B007"],
      labels: [1,2,3,4,5,6,7],
      datasets: [{
        label: 'Bloques',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };

    const config = {
      type: 'bar' as const, // Provide a valid chart type here, such as 'bar', 'line', 'pie', etc.
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };

    const myChart = new Chart(
      document.getElementById('myBlockChart') as HTMLCanvasElement,
      config
    );
  }

} // end class
