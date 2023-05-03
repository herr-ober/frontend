import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountOrganizerService} from '../../../core/services/account-organizer.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register-organizer',
    templateUrl: './register-organizer.component.html',
})
export class RegisterOrganizerComponent implements OnInit {

    registerForm!: FormGroup;
    submitted = false;

    constructor(private AccountOrganizerService: AccountOrganizerService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    //Checks whether the specified validators apply
    async onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) return;
        await this.createAccountOrganizer()
    }

    //Sends the account values to the backend and redirects the user to login
    async createAccountOrganizer() {
        await this.AccountOrganizerService.postAccountOrganizer(this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password)
            .then(() => {
                this.router.navigate(['/auth/login/organizer']);
            })
            .catch(err => {
                this.displayErrorNotification(err.error.message)
            });
    }

    //Gets the error messages from the backend and returns them to the login
    displayErrorNotification(msg: string): void {
        let eventErrorNotification = document.getElementById("register-error-notification");
        eventErrorNotification!.innerHTML = msg;
        eventErrorNotification!.style.display = "block";
    }
}
