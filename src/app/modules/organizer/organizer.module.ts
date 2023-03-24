import { OrganizerRoutingModule } from './organizer-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOrganizerComponent } from './dashboard/dashboard.component';
import { CreateNewEventComponent } from './create-new-event/create-new-event.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardOrganizerComponent,
    CreateNewEventComponent
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    FormsModule
  ]
})
export class OrganizerModule { }
