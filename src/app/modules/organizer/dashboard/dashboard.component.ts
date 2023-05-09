import {Router} from '@angular/router';

import {EventService} from '../../../core/services/event.service';
import {Component, HostListener, OnInit} from '@angular/core';
import {IEvent} from 'src/app/shared/models/IEvent';

@Component({
    selector: 'app-organizer-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardOrganizerComponent implements OnInit {

    event: IEvent | undefined;
    eventExists: boolean = false;

    private confirmEventDeletionModalVisible: boolean = false;


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
        localStorage.clear();
        await this.router.navigate(["/auth/login/organizer"]);
    }

    async endEvent() {
        await this.eventService.deleteEvent();
        window.location.reload();
    }

    //Switches confirm event deletion Modal
    switchConfirmEventDeletionModal() {
        let confirmEventDeletionModal = document.getElementById("confirm-event-deletion-modal");
        if (confirmEventDeletionModal !== null) {
            if (!this.confirmEventDeletionModalVisible) {
                confirmEventDeletionModal!.style.display = "block";
                this.confirmEventDeletionModalVisible = true;
            } else {
                confirmEventDeletionModal!.style.display = "none";
                this.confirmEventDeletionModalVisible = false;
            }
        }
    }

    @HostListener('document:click', ['$event'])
    async onClick(e: MouseEvent) {
        let clickedID: String = (e.target as Element).id;
        if (clickedID !== null) {
            if (this.confirmEventDeletionModalVisible && (clickedID == "confirm-event-deletion-modal-background")) {
                this.switchConfirmEventDeletionModal();
            }
        }
    }
}
