import {OrganizerRoutingModule} from './organizer-routing.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardOrganizerComponent} from './dashboard/dashboard.component';
import {CreateNewEventComponent} from './create-new-event/create-new-event.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModifyEventComponent} from './modify-event/modify-event.component';
import {ManageStaff} from "./add-staff/manage-staff.component";
import {AddProductsComponent} from './add-products/add-products.component';
import {ManageTables} from "./manage-tables/manage-tables.component";

@NgModule({
    declarations: [
        DashboardOrganizerComponent,
        CreateNewEventComponent,
        ModifyEventComponent,
        ManageStaff,
        AddProductsComponent,
        ManageTables
    ],
    imports: [
        CommonModule,
        OrganizerRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class OrganizerModule {
}
