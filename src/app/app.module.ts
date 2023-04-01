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
import { OpAnalysisComponent } from './op-analysis/op-analysis.component';
import { OpConfigurationComponent } from './op-configuration/op-configuration.component';
import { HelpComponent } from './help/help.component';
import { TestComponent } from './test/test.component';


/* Routing */
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'operativa', component: OpOperationsComponent},
  {path: 'analisis', component: OpAnalysisComponent},
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
      TestComponent
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
