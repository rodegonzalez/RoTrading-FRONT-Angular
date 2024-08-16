import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';


import { FormGroup } from '@angular/forms';
import { IPositionView } from 'src/app/interfaces/IPosition.interface';
import { IPositionSetup } from 'src/app/interfaces/IPositionSetup.interface';
import { IPositionPattern } from 'src/app/interfaces/IPositionPattern.interface';

import { PositionsService } from '../../../../services/positions.service';
import { PositionSetupsService } from '../../../../services/position_setups.service';
import { PositionPatternsService, PositionHighPatternsService } from '../../../../services/position_patterns.service';
import { LoggerService, Tlog } from '../../../../services/logger.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styles: [
  ]
})

// --------------------------------------------------------------
// --------------------------------------------------------------
export class PositionDetailComponent {

}