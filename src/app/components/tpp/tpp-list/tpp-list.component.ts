import { Component, OnInit } from '@angular/core';
import { TppService } from '../../../services/tpp.service';
import { ITpp } from '../../../interfaces/ITpp.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './tpp-list.component.html',
  styleUrls: []
})
export class TppListComponent implements OnInit  {

  items: Array<ITpp>;

  constructor(private route: ActivatedRoute,  private router: Router, private tppService: TppService) {
    this.items = new Array<ITpp> ;
   }

  ngOnInit(): void{
    this.tppService.getAll().subscribe({
      complete: () => {
          console.log("Terminado tppService-http");
          console.log("route="+ this.route.snapshot.url.toString());
          console.log("data: ");
          console.log(this.items);
      },

      next : (data: Array<ITpp>) => {
        this.items = data;
      },
      error : (e) => {
        console.log("tppService-http error:");
        console.log(e);
      }
    });
  }

  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }
}
