import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from './../../../core/services/event.service';
import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/models/IEvent';

@Component({
  selector: 'app-organizer-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardOrganizerComponent implements OnInit {

  constructor(private eventService: EventService) {
  }

  event: IEvent | undefined;
  eventExists: boolean = false;



  ngOnInit(): void {
    this.reload();
  }

  async reload() {
    await this.eventService.getEvent()
      .then(res => {this.event = res})
      .catch((err: HttpErrorResponse) => {})
    this.eventExists = (this.event != undefined);
    console.log(this.event)
  }
}