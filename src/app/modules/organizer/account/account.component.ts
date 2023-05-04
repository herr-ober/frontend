import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from 'src/app/core/services/account.service';
import {IAccountOrganizer} from "../../../shared/models/IAccountOrganizer";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit{

    accountForm!: FormGroup;
    submitted = false;


    private confirmAccountDeletionModalVisible: boolean = false;

    constructor(private accountService: AccountService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.accountForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });

        this.reload();
    }

    //Checks whether the specified validators apply
    async onSubmit() {
        this.submitted = true;
        if (this.accountForm.invalid) return;
        this.updateAccount()
    }
    
    //Sends the account values to the backend and updates account
    async updateAccount() {
        this.submitted = true;
        if (this.accountForm.invalid) return;
        await this.accountService.patchAccount({
            name: this.accountForm.value.username,
            email: this.accountForm.value.email,
            password: this.accountForm.value.password
        })
        .then(() => {
            window.location.reload();
        })
        .catch(err => {
            this.displayErrorNotification(err.error.message)
        }); 
    }

    //Deletes account and removes the event
    async deleteAccount() {
        await this.accountService.deleteAccount();
        this.router.navigate(['/auth/register/organizer']);
    }

    //Opens and close the Modal
    switchConfirmAccountDeletionModal() {
        let confirmEventDeletionModal = document.getElementById("confirm-account-deletion-modal");
        if (confirmEventDeletionModal !== null) {
            if (!this.confirmAccountDeletionModalVisible) {
                confirmEventDeletionModal!.style.display = "block";
                this.confirmAccountDeletionModalVisible = true;
            } else {
                confirmEventDeletionModal!.style.display = "none";
                this.confirmAccountDeletionModalVisible = false;
            }
        }
    }

    //Get the current account informations and load them in the page
    async reload() {
        const account = await this.accountService.getAccount();
        this.accountForm.controls["username"].setValue(account.name)
        this.accountForm.controls["email"].setValue(account.email)
    }

    //Gets the error messages from the backend and returns them to the login
    displayErrorNotification(msg: string): void {
        let eventErrorNotification = document.getElementById("account-error-notification");
        eventErrorNotification!.innerHTML = msg;
        eventErrorNotification!.style.display = "block";
    }
}