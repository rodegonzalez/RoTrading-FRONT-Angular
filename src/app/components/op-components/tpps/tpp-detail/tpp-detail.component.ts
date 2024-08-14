import { Component,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TppService } from '../../../../services/tpp.service';
import { ITpp } from '../../../../interfaces/ITpp.interface';
import { LoggerService, Tlog } from '../../../../services/logger.service';

@Component({
  selector: 'app-tpp-detail',
  templateUrl: './tpp-detail.component.html',
  styleUrls: []
})

export class TppDetailComponent {
  //@Input() item: any;


  public itemId: number;
  //item: Array<ITpp>;
  item: ITpp;


  constructor(private route: ActivatedRoute, private router: Router
    , private tppService: TppService
    , private loggerService: LoggerService) {
    const id = 'id';
    this.itemId = +this.route.snapshot.params[id];

    // Inicializa item con un objeto vacío o con los valores necesarios
    this.item = {
      id: 0,
      name: '',
      description: '',
      status: '',              
      creation: '',
      modification: '',
      blockprefix: '',
      maxblocksecuence: 0,
      note:'',
      active: 0,
      deleted: 0
    };

  }

  onGo(id:any){
    this.itemId = +id;
    this.router.navigate(['tpp-detail', this.itemId]);
  }

  ngOnInit(): void{
    this.tppService.getOne(this.itemId).subscribe({
      complete: () => {
         this.loggerService.log(Tlog.info,"Terminado tppService-http");
         this.loggerService.log(Tlog.info,"route="+ this.route.snapshot.url.toString());
         this.loggerService.log(Tlog.info,"data: ");
         this.loggerService.log(Tlog.info,this.item);
      },

      //next : (data: Array<ITpp>) => {
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

  edit(): void{
    this.router.navigate(['/tpp-edit/', this.itemId]);
  }

  onBack()
  {
    this.router.navigate(['/tpps']);
  }

  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }
}


