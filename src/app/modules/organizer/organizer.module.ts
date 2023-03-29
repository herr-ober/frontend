import { OrganizerRoutingModule } from './organizer-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOrganizerComponent } from './dashboard/dashboard.component';
import { CreateNewEventComponent } from './create-new-event/create-new-event.component';
import { FormsModule } from '@angular/forms';
import { ModifyEventComponent } from './modify-event/modify-event.component';



@NgModule({
  declarations: [
    DashboardOrganizerComponent,
    CreateNewEventComponent,
    ModifyEventComponent
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule,
    FormsModule
  ]
})
export class OrganizerModule { }
