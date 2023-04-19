import {Router} from '@angular/router';

import {EventService} from '../../../core/services/event.service';
import {Component, OnInit} from '@angular/core';
import {IEvent} from 'src/app/shared/models/IEvent';

@Component({
    selector: 'app-organizer-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardOrganizerComponent implements OnInit {

    event: IEvent | undefined;
    eventExists: boolean = false;
    createModal: Boolean = false;

    constructor(private router: Router, private eventService: EventService) {
    }

    async ngOnInit() {
        await this.reload();
    }

    async reload() {
        this.event = await this.eventService.getEvent();
        this.eventExists = (this.event != undefined);
    }

    async logout() {
        localStorage.removeItem('token');
        await this.router.navigate(['']);
    }

    openModal() {
        this.createModal = true;
    }
}
