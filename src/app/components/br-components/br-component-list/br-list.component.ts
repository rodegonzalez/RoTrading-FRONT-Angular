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

  newitem: IBroker;
  items: Array<IBroker>;
  constructor(private brokersService: BrokersService, private loggerService: LoggerService) {
    this.items = new Array<IBroker>;
    this.newitem = {
      id: 0,
      creation: "",
      name: "",
      description: "",
      status: "",
      note: "",
      active: 1
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

}