import { IEvent } from './../../models/IEvent';
import { ApiService } from "./api.service";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class EventService {


    constructor(private apiService: ApiService) { }


    async getEvent(): Promise<any> {
        return this.apiService.doGetRequest('/events')
    }
}