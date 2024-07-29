import { Component,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TppService } from '../../../services/tpp.service';
import { ITpp } from '../../../interfaces/ITpp.interface';
import { NgForm } from '@angular/forms';
import { LoggerService, Tlog } from '../../../services/logger.service';

@Component({
  selector: 'app-tpp-edit',
  templateUrl: './tpp-edit.component.html',
  styleUrls: []
})

export class TppEditComponent {

  public itemId: number;
  item: any;

  constructor(private route: ActivatedRoute, private router: Router
    , private tppService: TppService
    , private loggerService: LoggerService) {
    const id = 'id';
    this.itemId = +this.route.snapshot.params[id];;
  }

  ngOnInit(): void{
    this.tppService.getOne(this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado tppService-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
      },
        next : (data: ITpp) => {
        this.item = data;
       this.loggerService.log(Tlog.info,"data en next: ");
         this.loggerService.log(Tlog.info,this.item);
      },
      error : (e) => {
       this.loggerService.log(Tlog.error,"tppService-http error:");
       this.loggerService.log(Tlog.error,e);
      }
    });
  }

  deleteOne(): void{
    this.tppService.deleteOne(this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado tppService-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
          this.router.navigate(['/tpps']);
      },
    });
  }

  onSubmit(Form : NgForm): void{
    this.tppService.update(Form.value, this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado tppService-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
          this.router.navigate(['/tpp-detail/' + this.itemId]);
      },
    });
  }


  onBack()
  {
    this.router.navigate(['/tpps']);
  }

  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }

  onBackToDetails(){
    const uri = '/tpp-detail/' + this.itemId;
    this.router.navigate([uri]);
  }


}


