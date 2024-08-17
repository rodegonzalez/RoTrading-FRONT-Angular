import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Extra
import { HomeComponent } from './components/home/home.component';
import { HelpComponent } from './components/help/help.component';
import { TestComponent } from './test/test.component';

// Analysis
import { AnAnalysisComponent } from './components/an-analysis/an-analysis.component';

// Tpps
import { TppListComponent } from './components/op-components/tpps/tpp-list/tpp-list.component';
import { TppDetailComponent } from './components/op-components/tpps/tpp-detail/tpp-detail.component';
import { TppAddComponent } from './components/op-components/tpps/tpp-add/tpp-add.component';
import { TppEditComponent } from './components/op-components/tpps/tpp-edit/tpp-edit.component';

// Patterns
import { PatternListComponent } from './components/op-components/patterns/pattern-list/pattern-list.component';
import { PatternDetailComponent } from './components/op-components/patterns/pattern-detail/pattern-detail.component';
import { PatternAddComponent } from './components/op-components/patterns/pattern-add/pattern-add.component';
import { PatternEditComponent } from './components/op-components/patterns/pattern-edit/pattern-edit.component';

// Setups
import { SetupListComponent } from './components/op-components/setups/setup-list/setup-list.component';
import { SetupDetailComponent } from './components/op-components/setups/setup-detail/setup-detail.component';
import { SetupAddComponent } from './components/op-components/setups/setup-add/setup-add.component';
import { SetupEditComponent } from './components/op-components/setups/setup-edit/setup-edit.component';

// Accounts & brokers
import { AccountListComponent } from './components/op-components/accounts/account-list/account-list.component';
import { AccountDetailComponent } from './components/op-components/accounts/account-detail/account-detail.component';
import { AccountAddComponent } from './components/op-components/accounts/account-add/account-add.component';
import { AccountEditComponent } from './components/op-components/accounts/account-edit/account-edit.component';

// Tickers & markets
import { TickerListComponent } from './components/op-components/tickers/ticker-list/ticker-list.component';
import { TickerDetailComponent } from './components/op-components/tickers/ticker-detail/ticker-detail.component';
import { TickerAddComponent } from './components/op-components/tickers/ticker-add/ticker-add.component';
import { TickerEditComponent } from './components/op-components/tickers/ticker-edit/ticker-edit.component';

// Divisas
import { DivisaListComponent } from './components/op-components/divisas/divisa-list/divisa-list.component';
import { DivisaDetailComponent } from './components/op-components/divisas/divisa-detail/divisa-detail.component';
import { DivisaAddComponent } from './components/op-components/divisas/divisa-add/divisa-add.component';
import { DivisaEditComponent } from './components/op-components/divisas/divisa-edit/divisa-edit.component';

// Positions
import { PositionListComponent } from './components/op-components/positions/position-list/position-list.component';
import { PositionDetailComponent } from './components/op-components/positions/position-detail/position-detail.component';
import { PositionAddComponent } from './components/op-components/positions/position-add/position-add.component';
import { PositionEditComponent } from './components/op-components/positions/position-edit/position-edit.component';

// Configuration
import { ConfigurationComponent } from './components/configuration/configuration.component';

/* Routing */
const routes: Routes = [
  {path: 'analisis', component: AnAnalysisComponent},
  {path: 'configuracion', component: ConfigurationComponent},
  {path: 'ayuda', component: HelpComponent},
  {path: 'test', component: TestComponent},

  {path: 'tpps', component: TppListComponent},
  {path: 'tpp-detail/:id', component: TppDetailComponent},
  {path: 'tpp-add', component: TppAddComponent},
  {path: 'tpp-edit/:id', component: TppEditComponent},

  {path: 'patterns', component: PatternListComponent},
  {path: 'pattern-detail/:id', component: PatternDetailComponent},
  {path: 'pattern-add', component: PatternAddComponent},
  {path: 'pattern-edit/:id', component: PatternEditComponent},

  {path: 'setups', component: SetupListComponent},
  {path: 'setup-detail/:id', component: SetupDetailComponent},
  {path: 'setup-add', component: SetupAddComponent},
  {path: 'setup-edit/:id', component: SetupEditComponent},

  {path: 'accounts', component: AccountListComponent},
  {path: 'account-detail/:id', component: AccountDetailComponent},
  {path: 'account-add', component: AccountAddComponent},
  {path: 'account-edit/:id', component: AccountEditComponent},

  {path: 'tickers', component: TickerListComponent},
  {path: 'ticker-detail/:id', component: TickerDetailComponent},
  {path: 'ticker-add', component: TickerAddComponent},
  {path: 'ticker-edit/:id', component: TickerEditComponent},

  {path: 'divisas', component: DivisaListComponent},
  {path: 'divisa-detail/:id', component: DivisaDetailComponent},
  {path: 'divisa-add', component: DivisaAddComponent},
  {path: 'divisa-edit/:id', component: DivisaEditComponent},

  {path: 'positions', component: PositionListComponent},
  {path: 'position-detail/:id', component: PositionDetailComponent},
  {path: 'position-add', component: PositionAddComponent},
  {path: 'position-edit/:id', component: PositionEditComponent},

  //{path: '', component: HomeComponent},
  {path: '**',  component: HomeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
