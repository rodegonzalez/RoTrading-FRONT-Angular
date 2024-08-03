import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../../../../services/accounts.service';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})
export class AccountAddComponent implements OnInit {

  constructor(private route: ActivatedRoute
    , private router: Router, private accountsService: AccountsService
    , private loggerService: LoggerService) {
  }

  ngOnInit(): void {

  }
  onSubmit(Form : NgForm){
    this.loggerService.log(Tlog.info,"Submitted form!");
    this.loggerService.log(Tlog.info,Form.value);

    var data = Form.value;
    console.log(data);

    this.accountsService.create(Form.value).subscribe({
      complete: () => {
          this.loggerService.log(Tlog.info,"Terminado Service-http");
          this.onBack();
      }
    });

  }
  onBack(){
    this.router.navigate(['/accounts']);
  }
  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }


}
