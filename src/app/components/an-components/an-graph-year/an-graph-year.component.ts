import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-an-graph-year',
  templateUrl: './an-graph-year.component.html',
  styles: [
  ]
})
export class AnGraphYearComponent implements OnInit {

   
  constructor() { }

  ngOnInit() {
    
    // Registrar todos los componentes necesarios de chart.js
    Chart.register(...registerables);

    const data = {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
      //labels: [1,2,3,4,5,6,7],
      datasets: [{
        label: '2024',
        data: [20, -12, 40, 81, 56, 72, 90],
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
      document.getElementById('myYearChart') as HTMLCanvasElement,
      config
    );

    //myChart.draw();

  } // ngOnInit
    
  
} // end class
