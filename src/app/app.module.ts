import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AccountsService } from './services/accounts.service';
import { PositionsService } from './services/positions.service';
import { LoggerService } from './services/logger.service';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HelpComponent } from './components/help/help.component';
import { TestComponent } from './components/test/test.component';

import { AnAnalysisComponent } from './components/an-analysis/an-analysis.component';
import { AnGraphMonthComponent } from './components/an-components/an-graph-month/an-graph-month.component';
import { AnGraphYearComponent } from './components/an-components/an-graph-year/an-graph-year.component';
import { AnReportOperationsComponent } from './components/an-components/an-report-operations/an-report-operations.component';
import { AnReportBlocksComponent } from './components/an-components/an-report-blocks/an-report-blocks.component';
import { AnPanelGraphsComponent } from './components/an-components/an-panel-graphs/an-panel-graphs.component';
import { AnPanelReportsComponent } from './components/an-components/an-panel-reports/an-panel-reports.component';

import { OpOperationsComponent } from './components/op-components/op-operations/op-operations.component';
import { OpClosedOperationComponent } from './components/op-components/op-closed-operation/op-closed-operation.component';
import { OpOpenOperationComponent } from './components/op-components/op-open-operation/op-open-operation.component';
import { OpPanelNewOperationComponent } from './components/op-components/op-panel-new-operation/op-panel-new-operation.component';
import { OpCalendarComponent } from './components/op-components/op-calendar/op-calendar.component';
import { OpAccountComponent } from './components/op-components/op-account/op-account.component';
import { OpPanelAccountsComponent } from './components/op-components/op-panel-accounts/op-panel-accounts.component';
import { OpPanelClosedOperationsComponent } from './components/op-components/op-panel-closed-operations/op-panel-closed-operations.component';
import { OpPanelOpenOperationsComponent } from './components/op-components/op-panel-open-operations/op-panel-open-operations.component';
import { OpPositionsComponent } from './components/op-components/op-positions/op-positions.component';
import { OpConfigurationComponent } from './components/op-components/op-configuration/op-configuration.component';

/* Routing */
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'operativa', component: OpOperationsComponent},
  {path: 'posiciones', component: OpPositionsComponent},
  {path: 'analisis', component: AnAnalysisComponent},
  {path: 'configuracion', component: OpConfigurationComponent},
  {path: 'ayuda', component: HelpComponent},
  {path: 'test', component: TestComponent},
  {path: '**', redirectTo: ''}
]

@NgModule({
  declarations: [		
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
      TestComponent,
      OpOperationsComponent,
      OpOpenOperationComponent,
      OpClosedOperationComponent,
      OpPositionsComponent,
      OpCalendarComponent,
      OpAccountComponent,
      OpPanelAccountsComponent,
      OpPanelClosedOperationsComponent,
      OpPanelOpenOperationsComponent,
      AnAnalysisComponent,
      AnGraphMonthComponent,
      AnGraphYearComponent,
      AnPanelGraphsComponent,
      AnPanelReportsComponent,
      AnReportOperationsComponent,
      AnReportBlocksComponent,
      OpPanelNewOperationComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    //RouterModule.forChild(appRoutesChild)
  ],
  providers: [
    AccountsService,
    PositionsService,
    LoggerService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
