import { EventService } from './../../../core/services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizer-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardOrganizerComponent implements OnInit {

  constructor(private eventService: EventService) { }

  eventExists: boolean = false;


  ngOnInit(): void {

    this.eventService.update();
    this.eventExists = this.eventService.getEventExists();
    
    console.log(this.eventService.getEventExists())
  }
}
