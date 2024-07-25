import { Component,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TppService } from '../../../services/tpp.service';
import { ITpp } from '../../../interfaces/ITpp.interface';

@Component({
  selector: 'app-tpp-detail',
  templateUrl: './tpp-detail.component.html',
  styleUrls: []
})

export class TppDetailComponent {
  //@Input() item: any;


  public itemId: number;
  //item: Array<ITpp>;
  item: any;


  constructor(private route: ActivatedRoute, private router: Router, private tppService: TppService) {
    const id = 'id';
    this.itemId = +this.route.snapshot.params[id];
    //this.item = new Array<ITpp> ;
  }

  onPrevious()
  {
    if (--this.itemId < 1) {
      this.itemId = 1;
    }

    this.router.navigate(['tpp-detail', this.itemId]);
  }
  onNext()
  {
    if (++this.itemId > 3) this.itemId = 3;
    this.router.navigate(['tpp-detail', this.itemId]);
  }

  onGo(id:any){
    this.itemId = +id;
    this.router.navigate(['tpp-detail', this.itemId]);
  }

  ngOnInit(): void{
    this.tppService.getOne(this.itemId).subscribe({
      complete: () => {
          console.log("Terminado tppService-http");
          console.log("route="+ this.route.snapshot.url.toString());
          console.log("data: ");
          console.log(this.item);
      },

      //next : (data: Array<ITpp>) => {
        next : (data: ITpp) => {
        this.item = data;
        console.log("data en next: ");
          console.log(this.item);
      },
      error : (e) => {
        console.log("tppService-http error:");
        console.log(e);
      }
    });
  }


  deleteOne(): void{
    this.tppService.deleteOne(this.itemId).subscribe({
      complete: () => {
          console.log("Terminado tppService-http");
          console.log("route="+ this.route.snapshot.url.toString());
          console.log("data: ");
          console.log(this.item);
          this.router.navigate(['/tpps']);
          /*
          // Navegar a la nueva ruta
          this.router.navigate(['/tpps']).then(() => {
            // Forzar la recarga de la página
            window.location.reload();
*/
      },

      /*
      error : (e) => {
        console.log("tppService-http error:");
        console.log(e);
      }
*/

    });
  }

}


