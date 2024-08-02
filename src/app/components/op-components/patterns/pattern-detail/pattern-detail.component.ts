import { Component,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatternService } from '../../../../services/patterns.service';
import { IPattern } from '../../../../interfaces/IPattern.interface';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-pattern-detail',
  templateUrl: './pattern-detail.component.html',
  styleUrls: []
})

export class PatternDetailComponent {
  //@Input() item: any;


  public itemId: number;
  //item: Array<ITpp>;
  item: any;


  constructor(private route: ActivatedRoute, private router: Router
    , private patternService: PatternService
    , private loggerService: LoggerService) {
    const id = 'id';
    this.itemId = +this.route.snapshot.params[id];
  }

  onGo(id:any){
    this.itemId = +id;
    this.router.navigate(['pattern-detail', this.itemId]);
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
        this.onBack();
      },
    });
  }

  edit(): void{
    this.router.navigate(['/pattern-edit/', this.itemId]);
  }

  onBack()
  {
    this.router.navigate(['/patterns']);
  }

  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }
}


