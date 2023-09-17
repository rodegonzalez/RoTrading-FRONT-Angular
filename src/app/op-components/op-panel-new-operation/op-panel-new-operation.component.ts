import { Component } from '@angular/core';
import { LoggerService, Tlog } from '../../services/logger.service';

@Component({
  selector: 'app-op-panel-new-operation',
  templateUrl: './op-panel-new-operation.component.html',
  styles: [
  ]
})
export class OpPanelNewOperationComponent {
  constructor(private loggerService: LoggerService) {
   }

  ngOnInit(): void{
  }

  newOperation(){
    this.loggerService.log(Tlog.info, "New operation");
  }
}
