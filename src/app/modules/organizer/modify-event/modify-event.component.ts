import { IEvent } from 'src/app/models/IEvent';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-modify-event',
  templateUrl: './modify-event.component.html',
  styleUrls: ['./modify-event.component.css']
})
export class ModifyEventComponent implements OnInit {

  constructor(private eventService: EventService) { }

  event: IEvent | undefined;

  /*
  eventName: string | undefined;
  eventLocation: string | undefined;
  eventDate: Date | undefined;
  */

  ngOnInit(): void { }

  async updateEventDetails() {

    await this.eventService.patchEvent(this.event!)
      .then(res => {
        console.log(res);
      })
      .catch()
  }
}
