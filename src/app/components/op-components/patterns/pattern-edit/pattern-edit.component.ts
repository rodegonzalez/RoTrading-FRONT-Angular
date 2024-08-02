import { Component,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatternService } from '../../../../services/pattern.service';
import { IPattern } from '../../../../interfaces/IPattern.interface';
import { NgForm } from '@angular/forms';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-pattern-edit',
  templateUrl: './pattern-edit.component.html',
  styleUrls: []
})

export class PatternEditComponent {

  public itemId: number;
  item: any;

  constructor(private route: ActivatedRoute, private router: Router
    , private patternService: PatternService
    , private loggerService: LoggerService) {
    const id = 'id';
    this.itemId = +this.route.snapshot.params[id];;
  }

  ngOnInit(): void{
    this.patternService.getOne(this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
      },
        next : (data: IPattern) => {
        this.item = data;
       this.loggerService.log(Tlog.info,"data en next: ");
         this.loggerService.log(Tlog.info,this.item);
      },
      error : (e) => {
       this.loggerService.log(Tlog.error,"Service-http error:");
       this.loggerService.log(Tlog.error,e);
      }
    });
  }

  deleteOne(): void{
    this.patternService.deleteOne(this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
          this.router.navigate(['/patterns']);
      },
    });
  }

  onSubmit(Form : NgForm): void{
    this.patternService.update(Form.value, this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
          this.router.navigate(['/pattern-detail/' + this.itemId]);
      },
    });
  }


  onBack()
  {
    this.router.navigate(['/patterns']);
  }

  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }

  onBackToDetails(){
    const uri = '/pattern-detail/' + this.itemId;
    this.router.navigate([uri]);
  }


}


