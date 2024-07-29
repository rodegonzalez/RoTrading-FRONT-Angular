import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TppService } from '../../../services/tpp.service';
import { LoggerService, Tlog } from '../../../services/logger.service';

@Component({
  selector: 'app-tpp-add',
  templateUrl: './tpp-add.component.html',
  styleUrls: ['./tpp-add.component.css']
})
export class TppAddComponent implements OnInit {

  constructor(private route: ActivatedRoute
    , private router: Router, private tppService: TppService
    , private loggerService: LoggerService) {
  }

  ngOnInit(): void {

  }
  onSubmit(Form : NgForm){
    this.loggerService.log(Tlog.info,"Submitted form!");
    this.loggerService.log(Tlog.info,Form.value);

    var data = Form.value;
    console.log(data);

    this.tppService.create(Form.value).subscribe({
      complete: () => {
           this.loggerService.log(Tlog.info,"Terminado tppService-http");
          this.router.navigate(['/tpps']);
      }
    });

  }
  onBack(){
    this.router.navigate(['/tpps']);
  }
  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }


}
