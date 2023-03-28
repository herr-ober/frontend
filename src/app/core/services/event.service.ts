import { IEvent } from './../../models/IEvent';
import { ApiService } from "./api.service";
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class EventService {


    private event: IEvent | undefined;


    constructor(private apiService: ApiService) { }



    private async getEvent(): Promise<IEvent> {
        return this.apiService.doGetRequest('/events')
    }


    getEventExists(): boolean {
        //console.log(this.event?.date)
        return (this.event != undefined);
    }

    async update() {
        await this.getEvent().then(res => {
            this.event = res;
            console.log(this.event)
            console.log(res)
        }).catch((err: HttpErrorResponse) => {
        })
    }
}