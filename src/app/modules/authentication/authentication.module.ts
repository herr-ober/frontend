import {AuthenticationRoutingModule} from './authentication-routing.module';
import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginStaffComponent} from './login-staff/login-staff.component';
import {LoginOrganizerComponent} from './login-organizer/login-organizer.component';
import {RegisterOrganizerComponent} from './register-organizer/register-organizer.component';

@NgModule({
    declarations: [
        LoginStaffComponent,
        LoginOrganizerComponent,
        RegisterOrganizerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthenticationRoutingModule,
        NgOptimizedImage
    ]
})
export class AuthenticationModule {
}
