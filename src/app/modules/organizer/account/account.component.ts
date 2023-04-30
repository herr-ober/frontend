import {Component, OnInit} from '@angular/core';
import {AccountService} from 'src/app/core/services/account.service';
import {IAccountOrganizer} from "../../../shared/models/IAccountOrganizer";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit{

    eventModified: IEvent = {uuid: "", organizerUuid: "", name: "", location: "", date: new Date()};
    eventDateAsString: string = "";

    constructor(private eventService: EventService) {
    }

    ngOnInit(): void {
        this.reload();
    }

    async updateEventDetails() {
        await this.eventService.patchEvent({
            name: this.eventModified.name,
            date: new Date(this.eventDateAsString),
            location: this.eventModified.location
        });
    }


    async reload() {
        const event = await this.eventService.getEvent();
        this.eventModified = event;
        this.eventDateAsString = event.date.toString().substring(0, 10);
    }
}



