import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TickerService } from '../../../../services/ticker.service';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-ticker-add',
  templateUrl: './ticker-add.component.html',
  styleUrls: ['./ticker-add.component.css']
})
export class TickerAddComponent implements OnInit {

  constructor(private route: ActivatedRoute
    , private router: Router, private tickerService: TickerService
    , private loggerService: LoggerService) {
  }

  ngOnInit(): void {

  }
  onSubmit(Form : NgForm){
    this.loggerService.log(Tlog.info,"Submitted form!");
    this.loggerService.log(Tlog.info,Form.value);

    var data = Form.value;
    console.log(data);

    this.tickerService.create(Form.value).subscribe({
      complete: () => {
          this.loggerService.log(Tlog.info,"Terminado Service-http");
          this.onBack();
      }
    });

  }
  onBack(){
    this.router.navigate(['/setups']);
  }
  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }


}
