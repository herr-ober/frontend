import { OrganizerRoutingModule } from './organizer-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOrganizerComponent } from './dashboard/dashboard.component';
import { CreateNewEventComponent } from './create-new-event/create-new-event.component';
import { AddProductsComponent } from './add-products/add-products.component';



@NgModule({
  declarations: [
    DashboardOrganizerComponent,
    CreateNewEventComponent,
    AddProductsComponent
  ],
  imports: [
    CommonModule,
    OrganizerRoutingModule
  ]
})
export class OrganizerModule { }
