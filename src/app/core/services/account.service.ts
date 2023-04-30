import {IAccountOrganizer} from '../../shared/models/IAccountOrganizer';
import {IEvent} from '../../shared/models/IEvent';
import {ApiService} from "./api.service";
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AccountService {

    constructor(private apiService: ApiService) {
    }

    async getAccount(): Promise<IAccountOrganizer> {
        return this.apiService.doGetRequest('/accounts ')
    }

    async patchAccount(body: IAccountOrganizer): Promise<void> {
        return this.apiService.doPatchRequest('/accounts ', {updates: body})
    }

    async deleteAccount(): Promise<void> {
        return this.apiService.doDeleteRequest('/accounts ', {})
    }
}
