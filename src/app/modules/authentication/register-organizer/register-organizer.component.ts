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

    get f() {
        return this.registerForm.controls;
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    async onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) return;
        await this.createAccountOrganizer()
    }

    async createAccountOrganizer() {
        await this.AccountOrganizerService.postAccountOrganizer(this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password)
            .then(() => {
                this.router.navigate(['/auth/login/organizer']);
            })
            .catch(err => {
                this.displayErrorNotification(err.error.message)
            });
    }

    displayErrorNotification(msg: string): void {
        let eventErrorNotification = document.getElementById("register-error-notification");
        eventErrorNotification!.innerHTML = msg;
        eventErrorNotification!.style.display = "block";
    }
}
