import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-an-graph-month',
  templateUrl: './an-graph-month.component.html',
  styles: []
})
export class AnGraphMonthComponent implements OnInit {

  
  constructor() { }

  ngOnInit() {
    
    // Registrar todos los componentes necesarios de chart.js
    Chart.register(...registerables);

    const data = {
      labels: ["Semana 52", "Semana 53", "Semana 54", "Semana 55"],
      //labels: [1,2,3,4,5,6,7],
      datasets: [{
        label: 'Septiembre',
        data: [65, 59, -18, 91],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)'
        ],
        borderWidth: 1
      }]
    };

    const config = {
      type: 'line' as const, // Provide a valid chart type here, such as 'bar', 'line', 'pie', etc.
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
      document.getElementById('myMonthChart') as HTMLCanvasElement,
      config
    );

    myChart.draw();

  } // ngOnInit
    

} // end class
