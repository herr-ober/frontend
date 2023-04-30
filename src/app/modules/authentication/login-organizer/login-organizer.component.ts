import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountOrganizerService} from '../../../core/services/account-organizer.service';

@Component({
    selector: 'app-login-organizer',
    templateUrl: './login-organizer.component.html',
})
export class LoginOrganizerComponent implements OnInit{

    loginForm!: FormGroup;
    submitted = false;

    constructor(private accountOrganizerService: AccountOrganizerService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    //Checks whether the specified validators apply
    async onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        await this.loginAccountOrganizer()
    }

    //Retrieves account values and writes them to browser storage
    async loginAccountOrganizer() {
        await this.accountOrganizerService.loginAccountOrganizer(this.loginForm.value.email, this.loginForm.value.password)
            .then(res => {
                localStorage.setItem("name", "organizer")
                localStorage.setItem("role", "organizer")
                localStorage.setItem("token", res.token)
                this.router.navigate(["/organizer"]);
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
