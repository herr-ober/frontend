import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountOrganizerService} from '../../../core/services/account-organizer.service';

@Component({
    selector: 'app-login-organizer',
    templateUrl: './login-organizer.component.html',
})
export class LoginOrganizerComponent {

    loginForm!: FormGroup;
    submitted = false;

    constructor(private accountOrganizerService: AccountOrganizerService, private router: Router, private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    async onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        await this.loginAccountOrganizer()
    }

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

    displayErrorNotification(msg: string): void {
        let eventErrorNotification = document.getElementById("login-error-notification");
        eventErrorNotification!.innerHTML = msg;
        eventErrorNotification!.style.display = "block";
    }
}
