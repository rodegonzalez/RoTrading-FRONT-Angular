import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatternService } from '../../../../services/pattern.service';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-pattern-add',
  templateUrl: './pattern-add.component.html',
  styleUrls: ['./pattern-add.component.css']
})
export class PatternAddComponent implements OnInit {

  constructor(private route: ActivatedRoute
    , private router: Router, private patternService: PatternService
    , private loggerService: LoggerService) {
  }

  ngOnInit(): void {

  }
  onSubmit(Form : NgForm){
    this.loggerService.log(Tlog.info,"Submitted form!");
    this.loggerService.log(Tlog.info,Form.value);

    var data = Form.value;
    console.log(data);

    this.patternService.create(Form.value).subscribe({
      complete: () => {
          this.loggerService.log(Tlog.info,"Terminado PatternService-http");
          this.onBack();
      }
    });

  }
  onBack(){
    this.router.navigate(['/patterns']);
  }
  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }


}
