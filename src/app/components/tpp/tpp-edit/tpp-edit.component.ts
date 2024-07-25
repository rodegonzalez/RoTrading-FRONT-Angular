import { Component,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TppService } from '../../../services/tpp.service';
import { ITpp } from '../../../interfaces/ITpp.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tpp-edit',
  templateUrl: './tpp-edit.component.html',
  styleUrls: []
})

export class TppEditComponent {

  public itemId: number;
  item: any;

  constructor(private route: ActivatedRoute, private router: Router, private tppService: TppService) {
    const id = 'id';
    this.itemId = +this.route.snapshot.params[id];;
  }

  ngOnInit(): void{
    this.tppService.getOne(this.itemId).subscribe({
      complete: () => {
          console.log("Terminado tppService-http");
          console.log("route="+ this.route.snapshot.url.toString());
          console.log("data: ");
          console.log(this.item);
      },
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
      },
    });
  }

  onSubmit(Form : NgForm): void{
    this.tppService.update(Form.value, this.itemId).subscribe({
      complete: () => {
          console.log("Terminado tppService-http");
          console.log("route="+ this.route.snapshot.url.toString());
          console.log("data: ");
          console.log(this.item);
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


