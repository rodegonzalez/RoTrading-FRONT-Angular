import { Component,Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DivisaService } from '../../../../services/divisa.service';
import { NgForm } from '@angular/forms';
import { LoggerService, Tlog } from '../../../../services/logger.service';
import { __values } from 'tslib';
import { IDivisa } from 'src/app/interfaces/IDivisa.interface';

@Component({
  selector: 'app-divisa-edit',
  templateUrl: './divisa-edit.component.html',
  styleUrls: []
})

export class DivisaEditComponent {
  @ViewChild('input_active') input_active!: ElementRef;

  public itemId: number;
  item: IDivisa;

  constructor(private route: ActivatedRoute, private router: Router
    , private divisaService: DivisaService
    , private loggerService: LoggerService) {
    const id = 'id';
    this.itemId = this.route.snapshot.params[id];

    // Inicializa item con un objeto vacío o con los valores necesarios
    this.item = {
      name: '',
      description: '',            
      creation: '',
      modification: '',
      id: 0,
      note:'',
      active: 0,
      deleted: 0,
    };
    
  }

  ngOnInit(): void{
    this.divisaService.getOne(this.itemId).subscribe({
      complete: () => {
        
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
      },
        next : (data: IDivisa) => {
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
    this.divisaService.deleteOne(this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
          this.router.navigate(['/tickers']);
      },
    });
  }


  onSubmit(): void{
    this.item.active = this.input_active.nativeElement.checked ? 1 : 0;
    this.divisaService.update(this.item, this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado Service-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data despues: ");
         this.loggerService.log(Tlog.info,this.item);
          this.router.navigate(['/divisa-detail/' + this.itemId]);
      },
    });
  }

  onBack()
  {
    this.router.navigate(['/divisas']);
  }

  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }

  onBackToDetails(){
    const uri = '/divisa-detail/' + this.itemId;
    this.router.navigate([uri]);
  }


}


