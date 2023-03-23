import { SharedModule } from './../../shared/shared.module';
import { AppModule } from './../../app.module';
import { OrganizerRoutingModule } from './organizer-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOrganizerComponent } from './dashboard/dashboard.component';
import { CreateNewEventComponent } from './create-new-event/create-new-event.component';



@NgModule({
  declarations: [
    DashboardOrganizerComponent,
    CreateNewEventComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrganizerRoutingModule,
  ]
})
export class OrganizerModule { }
