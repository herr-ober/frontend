import {ApiService} from "./api.service";
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AccountOrganizerService {

    constructor(private apiService: ApiService) {
    }

    async postAccountOrganizer(name: string, email: string, password: string) {
        return this.apiService.doPostRequest('/accounts', {name: name, email: email, password: password})

    }

    async loginAccountOrganizer(email: string, password: string): Promise<any> {
        return this.apiService.doPostRequest('/accounts/login', {email: email, password: password})

    }

}
