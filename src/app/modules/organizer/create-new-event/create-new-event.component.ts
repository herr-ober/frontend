import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EventService } from './../../../core/services/event.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { Event } from 'src/app/models/IEvent';

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


  ngOnInit(): void { }


  async createNewEvent() {
    console.log("Speichern hier ...");

    await this.eventService.postEvent(new Event(this.eventName!, this.eventLocation!, this.eventDate!))
    .then(res => { 
      this.displayNotification("Event wurde erfolgreich angelegt. Jetzt können weitere Eventeinstellungen bearbeitet werden.");
      this.switchEventOptions();
    })
    .catch();
  }

  displayNotification(msg: string): void {
    let eventNotification = document.getElementById("event-notification");
    eventNotification!.innerHTML = msg;
    eventNotification!.style.display = "block";
  }


  displayErrorNotification(msg: string): void {
    let eventErrorNotification = document.getElementById("event-error-notification");
    eventErrorNotification!.innerHTML = msg;
    eventErrorNotification!.style.display = "block";
  }


  switchEventOptions(): void {
    let eventGeneral = document.getElementById("general-event-information");
    eventGeneral!.style.display = "none";

    let eventStructure = document.getElementById("event-structure");
    eventStructure!.style.display = "block";
  }
}