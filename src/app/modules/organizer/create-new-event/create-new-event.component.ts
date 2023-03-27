import { EventService } from './../../../core/services/event.service';
import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-new-event',
  templateUrl: './create-new-event.component.html',
  styleUrls: ['./create-new-event.component.css']
})


export class CreateNewEventComponent implements OnInit {

  constructor(private eventService: EventService) { }

  eventName: string | undefined;
  eventLocation: string | undefined;
  eventDate: Date | undefined;


  ngOnInit(): void {

    this.loadEventIfAlreadyExists();
  }


  saveEventSettings(): void {
    console.log("Speichern hier ...");
  }


  async loadEventIfAlreadyExists() {

    await this.eventService.getEvent().then(res => {
      this.eventName = res.event.name;
      this.eventLocation = res.event.location;
      this.eventDate = res.event.date;
    })
  }
}
