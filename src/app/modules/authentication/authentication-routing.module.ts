import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginStaffComponent } from './login-staff/login-staff.component';
import { LoginOrganizerComponent } from './login-organizer/login-organizer.component';
import { RegisterOrganizerComponent } from './register-organizer/register-organizer.component';

const routes: Routes = [
  {
    path: 'login/staff',
    component: LoginStaffComponent
  },
  {
    path: 'login/organizer',
    component: LoginOrganizerComponent
  },
  {
    path: 'register/organizer',
    component: RegisterOrganizerComponent
  },
  {
    path: '**',
    redirectTo: 'login/staff'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
