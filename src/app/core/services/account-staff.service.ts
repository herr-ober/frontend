import {ApiService} from "./api.service";
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AccountStaffService {

    constructor(private apiService: ApiService) {
    }

    async loginAccountStaff(code: string): Promise<any> {
        return this.apiService.doPostRequest('/events/Staff/login', {code: code})

    }
}
