import { ICreateEvent } from './../../../models/IEvent';
import { EventService } from './../../../core/services/event.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-event',
  templateUrl: './create-new-event.component.html',
})


export class CreateNewEventComponent implements OnInit {

  constructor(private eventService: EventService, private router: Router) { }


  event: ICreateEvent = { name: "", location: "", date: new Date(0) }


  ngOnInit(): void { }


  async createNewEvent() {
    
    console.log(new Date(0));

    await this.eventService.postEvent(this.event)
    .then(res => { 
      this.router.navigate(['/organizer']);
    })
    .catch(err => {
      this.displayErrorNotification("Ein Fehler ist aufgetreten.")
    });
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
}
