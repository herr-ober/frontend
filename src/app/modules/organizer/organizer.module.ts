import {OrganizerRoutingModule} from './organizer-routing.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardOrganizerComponent} from './dashboard/dashboard.component';
import {CreateNewEventComponent} from './create-new-event/create-new-event.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModifyEventComponent} from './modify-event/modify-event.component';
import {ManageStaff} from "./add-staff/manage-staff.component";

@NgModule({
  declarations: [
    DashboardOrganizerComponent,
    CreateNewEventComponent,
    ModifyEventComponent,
    ManageStaff
  ],
    imports: [
        CommonModule,
        OrganizerRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class OrganizerModule { }
