import { Component,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PositionHighPatternsService } from '../../../../services/position_patterns.service';
import { IPositionHighPattern } from '../../../../interfaces/IPositionPattern.interface';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-pattern-detail',
  templateUrl: './pattern-detail.component.html',
  styleUrls: []
})

export class PatternDetailComponent {

  public itemId: number;
  item: IPositionHighPattern;

  constructor(private route: ActivatedRoute, private router: Router
    , private positionHighPatternsService: PositionHighPatternsService
    , private loggerService: LoggerService) {
    const id = 'id';
    this.itemId = +this.route.snapshot.params[id];
    
    // Inicializa item con un objeto vacío o con los valores necesarios
    this.item = {
      name: '',
      description: '',
      status: '',              
      creation: '',
      modification: '',
      id: 0,
      note:'',
      active: 0,
      deleted: 0
    };

  }

  onGo(id:any){
    this.itemId = +id;
    this.router.navigate(['pattern-detail', this.itemId]);
  }

  ngOnInit(): void{
    this.positionHighPatternsService.getOne(this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
      },

        next : (data: IPositionHighPattern) => {
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
    this.positionHighPatternsService.deleteOne(this.itemId).subscribe({
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
