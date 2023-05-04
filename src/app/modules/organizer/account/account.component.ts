import {Component, OnInit} from '@angular/core';
import {AccountService} from 'src/app/core/services/account.service';
import {IAccountOrganizer} from "../../../shared/models/IAccountOrganizer";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit{

    accountModified: IAccountOrganizer = {uuid: "", name: "", email: "", password: ""};


    constructor(private accountService: AccountService) {
    }

    ngOnInit(): void {
        this.reload();
    }

    async updateAccount() {
        await this.accountService.patchAccount({
            name: this.accountModified.name,
            email: this.accountModified.email,
            password: this.accountModified.password
        });
    }

    async deleteAccount() {
        await this.accountService.deleteAccount({
            uuid: this.accountModified.uuid
        });
    }

    async reload() {
        const account = await this.accountService.getAccount();
        this.accountModified = account;
        console.log(this.accountModified)
    }
}



