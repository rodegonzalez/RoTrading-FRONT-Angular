import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DivisaService } from '../../../../services/divisa.service';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-divisa-add',
  templateUrl: './divisa-add.component.html',
  styleUrls: ['./divisa-add.component.css']
})
export class DivisaAddComponent implements OnInit {

  constructor(private route: ActivatedRoute
    , private router: Router, private divisaService: DivisaService
    , private loggerService: LoggerService) {
  }

  ngOnInit(): void {

  }
  onSubmit(Form : NgForm){
    this.loggerService.log(Tlog.info,"Submitted form!");
    this.loggerService.log(Tlog.info,Form.value);

    var data = Form.value;
    console.log(data);

    this.divisaService.create(Form.value).subscribe({
      complete: () => {
          this.loggerService.log(Tlog.info,"Terminado Service-http");
          this.onBack();
      }
    });

  }
  onBack(){
    this.router.navigate(['/divisas']);
  }
  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }


}
