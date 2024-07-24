import { Component } from '@angular/core';
import { LoggerService, Tlog } from '../../../services/logger.service';
import { BrokersService } from '../../../services/brokers.service';
import { IBroker } from '../../../interfaces/IBoker.interface';


@Component({
  selector: 'app-br-component-list',
  templateUrl: './br-list-component.ts.html',
  styles: [
  ]
})
export class BrComponentListComponent {

  formdata: IBroker = {
    id: 0,
    creation: "",
    modification: "",
    name: "",
    description: "",
    status: "",
    note: "",
    active: 1,
    deleted: 0
  }

  newitem: IBroker;
  items: Array<IBroker>;
  constructor(private brokersService: BrokersService, private loggerService: LoggerService) {
    this.items = new Array<IBroker>;
    this.newitem = {
      id: 0,
      creation: "",
      modification: "",
      name: "",
      description: "",
      status: "",
      note: "",
      active: 1,
      deleted: 0
    }

   }

  ngOnInit(): void{

    this.brokersService.getAll().subscribe({
      complete: () => {
          this.loggerService.log(Tlog.info, "brokersService.getAll vía http - Ended.");
      },
      next: (data: Array<IBroker>) => {
        this.loggerService.log(Tlog.info, "brokersService.getAll vía http - data:");
        this.loggerService.log(Tlog.info, data);
        this.items = data;        
      },
      error: (e: any) => {
        this.loggerService.log(Tlog.error, "brokersService.getAll vía http - http error.");
        this.loggerService.log(Tlog.error, e);
      }
    });

  }

  onClickSubmitUpdate(data: any, id: number){ {
    data.modification = this.getDate();


    this.loggerService.log(Tlog.info, "FORM formdata:");
    this.loggerService.log(Tlog.info, data);

    this.loggerService.log(Tlog.info, "FORM updaterecord:");
    this.loggerService.log(Tlog.info, `data.id=${id}`);
    //this.loggerService.log(Tlog.info, `data.id=${id}`);

    let response : any = this.brokersService.update(data, id);
    this.loggerService.log(Tlog.info, "FORM updaterecord response:");
    this.loggerService.log(Tlog.info,response);
  }
}

   getDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0'); // Corregido para obtener el día correcto
    const hour = `${now.getHours()}`.padStart(2, '0');
    const minute = `${now.getMinutes()}`.padStart(2, '0');
    const second = `${now.getSeconds()}`.padStart(2, '0');
    return `${year}/${month}/${day} ${hour}:${minute}:${second}`; // Añadido hora y minutos
   }


  }

