import { Component,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DivisaService } from '../../../../services/divisa.service';
import { IDivisa } from '../../../../interfaces/IDivisa.interface';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-divisa-detail',
  templateUrl: './divisa-detail.component.html',
  styleUrls: []  
})

export class DivisaDetailComponent {

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

  onGo(id:any){
    this.itemId = +id;
    this.router.navigate(['divisa-detail', this.itemId]);
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
        this.onBack();
      },
    });
  }

  edit(): void{
    this.router.navigate(['/divisa-edit/', this.itemId]);
  }

  onBack()
  {
    this.router.navigate(['/divisas']);
  }

  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }
}


