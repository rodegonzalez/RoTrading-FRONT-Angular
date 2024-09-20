import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';


@Component({
  selector: 'app-report-main',
  templateUrl: './report-main.component.html',
  styles: [
  ]
})
export class ReportMainComponent {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function() {
      $('#example').DataTable();
    });

  }

}
