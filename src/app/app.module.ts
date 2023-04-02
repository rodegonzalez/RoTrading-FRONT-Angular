import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { OpOperationsComponent } from './op-operations/op-operations.component';
import { AnAnalysisComponent } from './an-analysis/an-analysis.component';
import { OpConfigurationComponent } from './op-configuration/op-configuration.component';
import { HelpComponent } from './help/help.component';
import { TestComponent } from './test/test.component';
import { OpClosedOperationComponent } from './op-components/op-closed-operation/op-closed-operation.component';
import { OpOpenOperationComponent } from './op-components/op-open-operation/op-open-operation.component';
import { OpCalendarComponent } from './op-components/op-calendar/op-calendar.component';
import { OpAccountComponent } from './op-components/op-account/op-account.component';
import { OpPanelAccountsComponent } from './op-components/op-panel-accounts/op-panel-accounts.component';
import { OpPanelClosedOperationsComponent } from './op-components/op-panel-closed-operations/op-panel-closed-operations.component';
import { OpPanelOpenOperationsComponent } from './op-components/op-panel-open-operations/op-panel-open-operations.component';

import { AnGraphMonthComponent } from './an-components/an-graph-month/an-graph-month.component';
import { AnGraphYearComponent } from './an-components/an-graph-year/an-graph-year.component';
import { AnPanelGraphsComponent } from './an-components/an-panel-graphs/an-panel-graphs.component';
import { AnPanelReportsComponent } from './an-components/an-panel-reports/an-panel-reports.component';
import { AnReportOperationsComponent } from './an-components/an-report-operations/an-report-operations.component';
import { AnReportBlocksComponent } from './an-components/an-report-blocks/an-report-blocks.component';

/* Routing */
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'operativa', component: OpOperationsComponent},
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
      AnReportBlocksComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    //RouterModule.forChild(appRoutesChild)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
