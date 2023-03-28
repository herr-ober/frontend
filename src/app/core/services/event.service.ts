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


    /*async update() {
        await this.getEvent().then(res => {
            this.event = res;
            this.eventExists = true;
        }).catch((err: HttpErrorResponse) => {
        })
        console.log(this.event);
        console.log(this.eventExists)
    }*/
}