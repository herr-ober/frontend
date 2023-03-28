import { AuthenticationRoutingModule } from './authentication-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginStaffComponent } from './login-staff/login-staff.component';
import { LoginOrganizerComponent } from './login-organizer/login-organizer.component';
import { RegisterOrganizerComponent } from './register-organizer/register-organizer.component';



@NgModule({
  declarations: [
    LoginStaffComponent,
    LoginOrganizerComponent,
    RegisterOrganizerComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
