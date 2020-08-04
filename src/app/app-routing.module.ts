import { CurrentComponent } from './search-form/current/current.component';
import { WeeklyComponent } from './search-form/weekly/weekly.component';
import { HourlyComponent } from './search-form/hourly/hourly.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'weekly-tab', component: WeeklyComponent },
  { path: 'hourly-tab', component: HourlyComponent },
  { path: 'current-tab', component: CurrentComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
