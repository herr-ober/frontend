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

    get f() {
        return this.loginForm.controls;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            code: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    async onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        await this.loginAccountStaff()
    }

    async loginAccountStaff() {
        await this.AccountStaffService.loginAccountStaff(this.loginForm.value.code)
            .then(res => {
                localStorage.setItem("name", res.name)
                localStorage.setItem("role", res.role)
                localStorage.setItem("token", res.token)
                               
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

    displayErrorNotification(msg: string): void {
        let eventErrorNotification = document.getElementById("login-error-notification");
        eventErrorNotification!.innerHTML = msg;
        eventErrorNotification!.style.display = "block";
    }
}
