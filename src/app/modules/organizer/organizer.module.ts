import { OrganizerRoutingModule } from './organizer-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOrganizerComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    DashboardOrganizerComponent
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule
  ]
})
export class OrganizerModule { }
