import { ModifyEventComponent } from './modify-event/modify-event.component';
import { CreateNewEventComponent } from './create-new-event/create-new-event.component';
import { DashboardOrganizerComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManageStaff} from "./add-staff/manage-staff.component";
import { AddProductsComponent } from './add-products/add-products.component';
import { AddtablesComponent } from './add-tables/add-tables.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardOrganizerComponent
  },
  {
    path: 'createevent',
    component: CreateNewEventComponent
  },
  {
    path: 'modifyevent',
    component: ModifyEventComponent
  },
  {
    path: 'addproduct',
    component: AddProductsComponent
  },
  {
    path: 'addtables',
    component: AddtablesComponent
  },
  {
    path: 'add-staff',
    component: ManageStaff
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class OrganizerRoutingModule { }
