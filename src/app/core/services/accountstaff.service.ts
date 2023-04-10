import { IAccountStaff, ILoginAccountStaff } from './../../models/IAccountStaff';
import { ApiService } from "./api.service";
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AccountStaffService {

    constructor(private apiService: ApiService) { 
    }

    async loginAccountStaff(token: string):Promise<any> {
        return this.apiService.doPostRequest('/staff/login', {token: token})

    }

}