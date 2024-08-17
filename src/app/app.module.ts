import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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

// Tpps
import { TppListComponent } from './components/op-components/tpps/tpp-list/tpp-list.component';
import { TppCardComponent } from './components/op-components/tpps/tpp-card/tpp-card.component';
import { TppDetailComponent } from './components/op-components/tpps/tpp-detail/tpp-detail.component';
import { TppAddComponent } from './components/op-components/tpps/tpp-add/tpp-add.component';
import { TppEditComponent } from './components/op-components/tpps/tpp-edit/tpp-edit.component';

// Patterns
import { PatternListComponent } from './components/op-components/patterns/pattern-list/pattern-list.component';
import { PatternCardComponent } from './components/op-components/patterns/pattern-card/pattern-card.component';
import { PatternDetailComponent } from './components/op-components/patterns/pattern-detail/pattern-detail.component';
import { PatternAddComponent } from './components/op-components/patterns/pattern-add/pattern-add.component';
import { PatternEditComponent } from './components/op-components/patterns/pattern-edit/pattern-edit.component';

// Setups
import { SetupListComponent } from './components/op-components/setups/setup-list/setup-list.component';
import { SetupCardComponent } from './components/op-components/setups/setup-card/setup-card.component';
import { SetupDetailComponent } from './components/op-components/setups/setup-detail/setup-detail.component';
import { SetupAddComponent } from './components/op-components/setups/setup-add/setup-add.component';
import { SetupEditComponent } from './components/op-components/setups/setup-edit/setup-edit.component';

// Accounts & brokers
import { AccountListComponent } from './components/op-components/accounts/account-list/account-list.component';
import { AccountCardComponent } from './components/op-components/accounts/account-card/account-card.component';
import { AccountDetailComponent } from './components/op-components/accounts/account-detail/account-detail.component';
import { AccountAddComponent } from './components/op-components/accounts/account-add/account-add.component';
import { AccountEditComponent } from './components/op-components/accounts/account-edit/account-edit.component';

// Tickers & markets
import { TickerListComponent } from './components/op-components/tickers/ticker-list/ticker-list.component';
import { TickerCardComponent } from './components/op-components/tickers/ticker-card/ticker-card.component';
import { TickerDetailComponent } from './components/op-components/tickers/ticker-detail/ticker-detail.component';
import { TickerAddComponent } from './components/op-components/tickers/ticker-add/ticker-add.component';
import { TickerEditComponent } from './components/op-components/tickers/ticker-edit/ticker-edit.component';

// Divisas
import { DivisaListComponent } from './components/op-components/divisas/divisa-list/divisa-list.component';
import { DivisaCardComponent } from './components/op-components/divisas/divisa-card/divisa-card.component';
import { DivisaDetailComponent } from './components/op-components/divisas/divisa-detail/divisa-detail.component';
import { DivisaAddComponent } from './components/op-components/divisas/divisa-add/divisa-add.component';
import { DivisaEditComponent } from './components/op-components/divisas/divisa-edit/divisa-edit.component';

// Positions
import { PositionListOneComponent } from './components/op-components/positions/position-list-one/position-list-one.component';
import { PositionListComponent } from './components/op-components/positions/position-list/position-list.component';
import { PositionDetailComponent } from './components/op-components/positions/position-detail/position-detail.component';
import { PositionAddComponent } from './components/op-components/positions/position-add/position-add.component';
import { PositionEditComponent } from './components/op-components/positions/position-edit/position-edit.component';

// Configuration
import { ConfigurationComponent } from './components/configuration/configuration.component';

// Common
import { CalendarComponent } from './components/common/calendar/calendar.component';
import { CommonSubtitleComponent } from './components/common/common-subtitle/common-subtitle.component';
import { CommonTitleComponent } from './components/common/common-title/common-title.component';

// Shared
import { SharedModule } from './shared/shared.module'; // Importa el SharedModule
//import { NumberFormatWithDecimalsPipe } from './shared/number-format-with-decimals.pipe';

@NgModule({
  declarations: [		
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    TestComponent,
      
    TppListComponent,
      TppCardComponent,
      TppDetailComponent,
      TppAddComponent,
      TppEditComponent,

    PatternListComponent,
      PatternCardComponent,
      PatternDetailComponent,
      PatternAddComponent,
      PatternEditComponent,

    SetupListComponent,
      SetupCardComponent,
      SetupDetailComponent,
      SetupAddComponent,
      SetupEditComponent,

    AccountListComponent,
      AccountCardComponent,
      AccountDetailComponent,
      AccountAddComponent,
      AccountEditComponent,

    TickerListComponent,
      TickerCardComponent,
      TickerDetailComponent,
      TickerAddComponent,
      TickerEditComponent,

    DivisaListComponent,
      DivisaCardComponent,
      DivisaDetailComponent,
      DivisaAddComponent,
      DivisaEditComponent,

    AnAnalysisComponent,
      AnGraphMonthComponent,
      AnGraphYearComponent,
      AnPanelGraphsComponent,
      AnPanelReportsComponent,
      AnReportOperationsComponent,
      AnReportBlocksComponent,
    
    CommonSubtitleComponent,
      CommonTitleComponent,
      ConfigurationComponent,
    
    PositionListComponent,
      PositionListOneComponent,
      PositionDetailComponent,
      PositionAddComponent,
      PositionEditComponent,
   ],
  imports: [    
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    SharedModule,
  ],
  providers: [
    AccountsService,
    PositionsService,
    LoggerService,
    DecimalPipe,
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
