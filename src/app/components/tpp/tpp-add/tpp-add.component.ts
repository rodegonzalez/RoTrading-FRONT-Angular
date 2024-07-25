import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TppService } from '../../../services/tpp.service';

@Component({
  selector: 'app-tpp-add',
  templateUrl: './tpp-add.component.html',
  styleUrls: ['./tpp-add.component.css']
})
export class TppAddComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private tppService: TppService) {
  }

  ngOnInit(): void {

  }
  onSubmit(Form : NgForm){
    console.log("Submitted form!");
    console.log(Form.value);

    var data = Form.value;
    console.log(data);

    this.tppService.create(Form.value).subscribe({
      complete: () => {
          console.log("Terminado tppService-http");
          this.router.navigate(['/tpps']);
      }
    });

  }
  onBack(){
    this.router.navigate(['/tpps']);
  }
  onBackConfiguration(){
    this.router.navigate(['/configuracion']);
  }


}
