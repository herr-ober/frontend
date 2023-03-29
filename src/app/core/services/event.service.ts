import { IEvent, ICreateEvent, IUpdateEvent } from './../../models/IEvent';
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

    async patchEvent(body: IUpdateEvent): Promise<void> {
        return this.apiService.doPatchRequest('/events', { updates: body })
    }

    async postEvent(body: ICreateEvent): Promise<IEvent> {
        return this.apiService.doPostRequest('/events', body)
    }

    /*
    async deleteEvent(): Promise<IEvent> {
        return this.apiService.doGetRequest('/events')
    }
    */
}