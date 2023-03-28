import { IEvent } from './../../models/IEvent';
import { ApiService } from "./api.service";
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class EventService {

    constructor(private apiService: ApiService) { 
    }


    async getEvent(): Promise<IEvent> {
        return this.apiService.doGetRequest('/events')
    }

    async patchEvent(body: IEvent): Promise<void> {
        return this.apiService.doPatchRequest('/events', body)
    }

    async postEvent(body: IEvent): Promise<IEvent> {
        return this.apiService.doPostRequest('/events', body)
    }

    /*
    async deleteEvent(): Promise<IEvent> {
        return this.apiService.doGetRequest('/events')
    }
    */
}