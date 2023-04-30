import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountStaffService} from '../../../core/services/account-staff.service';

@Component({
    selector: 'app-login-organizer',
    templateUrl: './login-staff.component.html',
})
export class LoginStaffComponent implements OnInit {
    
    loginForm!: FormGroup;
    submitted = false;

    constructor(private AccountStaffService: AccountStaffService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            code: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    //Checks whether the specified validators apply
    async onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        await this.loginAccountStaff()
    }

    //Retrieves account values and writes them to browser storage
    async loginAccountStaff() {
        await this.AccountStaffService.loginAccountStaff(this.loginForm.value.code)
            .then(res => {
                localStorage.setItem("staffUuid", res.uuid)
                localStorage.setItem("eventUuid", res.eventUuid)
                localStorage.setItem("name", res.name)
                localStorage.setItem("role", res.role)
                localStorage.setItem("token", res.token)
                    
                //Forwards person according to appropriate role
                if (localStorage.getItem("role") == "waiter") {
                  this.router.navigate(["/waiter"]);
                } else if (localStorage.getItem("role") == "kitchen"){
                  this.router.navigate(["/kitchen"]);
                } else {
                  this.router.navigate(["/auth"]);
                }

            })
            .catch(err => {
                this.displayErrorNotification(err.error.message)
            });
    }

    //Gets the error messages from the backend and returns them to the login
    displayErrorNotification(msg: string): void {
        let eventErrorNotification = document.getElementById("login-error-notification");
        eventErrorNotification!.innerHTML = msg;
        eventErrorNotification!.style.display = "block";
    }
}
