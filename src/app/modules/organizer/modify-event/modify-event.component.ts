import {Component, OnInit} from '@angular/core';
import {EventService} from 'src/app/core/services/event.service';
import {IEvent} from "../../../shared/models/IEvent";
import { Router } from '@angular/router';

@Component({
    selector: 'app-modify-event',
    templateUrl: './modify-event.component.html',
})
export class ModifyEventComponent implements OnInit {

    /* Es sieht so aus, als könnte das HTML Date Element nur ein String in einem festgelegten Format yyyy-mm-dd verarbeiten.
    Daher die Konvertierung siehe unten und der zusätzliche String eventDateAsString. Wenn jemand eine bessere
    Lösung hat, dann gerne abändern */
    eventModified: IEvent = {uuid: "", organizerUuid: "", name: "", location: "", date: new Date()};
    eventDateAsString: string = "";

    constructor(private router: Router, private eventService: EventService, ) {
    }

    ngOnInit(): void {
        this.reload();
    }

    async updateEventDetails() {
        await this.eventService.patchEvent({
            name: this.eventModified.name,
            date: new Date(this.eventDateAsString),
            location: this.eventModified.location
        }).then((res) => {
            this.router.navigate(['/organizer']);
        }).catch();
    }


    async reload() {
        const event = await this.eventService.getEvent();
        this.eventModified = event;
        this.eventDateAsString = event.date.toString().substring(0, 10);
    }
}
