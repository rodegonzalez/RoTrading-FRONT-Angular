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
import { TestComponent } from './test/test.component';

import { AnAnalysisComponent } from './components/an-analysis/an-analysis.component';
import { AnGraphMonthComponent } from './components/an-components/an-graph-month/an-graph-month.component';
import { AnGraphYearComponent } from './components/an-components/an-graph-year/an-graph-year.component';
import { AnReportOperationsComponent } from './components/an-components/an-report-operations/an-report-operations.component';
import { AnReportBlocksComponent } from './components/an-components/an-report-blocks/an-report-blocks.component';
import { AnPanelGraphsComponent } from './components/an-components/an-panel-graphs/an-panel-graphs.component';
import { AnPanelReportsComponent } from './components/an-components/an-panel-reports/an-panel-reports.component';

import { OpOperationsComponent } from './components/op-components/op-operations/op-panel-operations/op-operations.component';
import { OpClosedOperationComponent } from './components/op-components/op-operations/op-operation-closed/op-closed-operation.component';
import { OpOpenOperationComponent } from './components/op-components/op-operations/op-operation-opened/op-open-operation.component';
import { OpPanelNewOperationComponent } from './components/op-components/op-operations/op-panel-operations-new/op-panel-new-operation.component';
import { OpPanelClosedOperationsComponent } from './components/op-components/op-operations/op-panel-operations-closed/op-panel-closed-operations.component';
import { OpPanelOpenOperationsComponent } from './components/op-components/op-operations/op-panel-operations-opened/op-panel-open-operations.component';
import { OpPositionsComponent } from './components/op-components/op-panel-positions/op-panel-positions.component';
import { OpConfigurationComponent } from './components/op-components/op-configuration/op-configuration.component';
import { OpCalendarComponent } from './components/op-components/op-calendar/op-calendar.component';
import { OpAccountComponent } from './components/op-components/op-account/op-account.component';
import { OpPanelAccountsComponent } from './components/op-components/op-panel-accounts/op-panel-accounts.component';
import { BrComponentListComponent } from './components/br-components/br-component-list/br-list.component';
import { TppListComponent } from './components/tpp/tpp-list/tpp-list.component';
import { TppCardComponent } from './components/tpp/tpp-card/tpp-card.component';
import { TppDetailComponent } from './components/tpp/tpp-detail/tpp-detail.component';
import { TppAddComponent } from './components/tpp/tpp-add/tpp-add.component';
import { TppEditComponent } from './components/tpp/tpp-edit/tpp-edit.component';
import { CommonSubtitleComponent } from './components/common/common-subtitle/common-subtitle.component';
import { CommonTitleComponent } from './components/common/common-title/common-title.component';

/* Routing */
const appRoutes: Routes = [
  //{path: '', component: HomeComponent},
  {path: 'operativa', component: OpOperationsComponent},
  {path: 'posiciones', component: OpPositionsComponent},
  {path: 'analisis', component: AnAnalysisComponent},
  {path: 'configuracion', component: OpConfigurationComponent},
  {path: 'ayuda', component: HelpComponent},
  {path: 'test', component: TestComponent},
  {path: 'brokers', component: BrComponentListComponent},
  {path: 'tpps', component: TppListComponent},
  {path: 'tpp-detail/:id', component: TppDetailComponent},
  {path: 'tpp-add', component: TppAddComponent},
  {path: 'tpp-edit/:id', component: TppEditComponent},
  {path: '**',  component: HomeComponent}
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
      OpPanelNewOperationComponent,
      BrComponentListComponent,
      TppListComponent,
      TppCardComponent,
      TppDetailComponent,
      TppAddComponent,
      TppEditComponent,
      CommonSubtitleComponent,
      CommonTitleComponent
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
