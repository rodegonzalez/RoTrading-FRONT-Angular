import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PositionSetupsService } from '../../../../services/position_setups.service';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-setup-add',
  templateUrl: './setup-add.component.html',
  styleUrls: ['./setup-add.component.css']
})
export class SetupAddComponent implements OnInit {

  constructor(private route: ActivatedRoute
    , private router: Router, private positionSetupsService: PositionSetupsService
    , private loggerService: LoggerService) {
  }

  ngOnInit(): void {

  }
  onSubmit(Form : NgForm){
    this.loggerService.log(Tlog.info,"Submitted form!");
    this.loggerService.log(Tlog.info,Form.value);

    var data = Form.value;
    console.log(data);

    this.positionSetupsService.create(Form.value).subscribe({
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
