import { ModifyEventComponent } from './modify-event/modify-event.component';
import { CreateNewEventComponent } from './create-new-event/create-new-event.component';
import { DashboardOrganizerComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule { }
