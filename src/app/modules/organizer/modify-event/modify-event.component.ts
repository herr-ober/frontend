import { IEvent } from 'src/app/models/IEvent';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modify-event',
  templateUrl: './modify-event.component.html',
  styleUrls: ['./modify-event.component.css']
})
export class ModifyEventComponent implements OnInit {

  constructor(private eventService: EventService) { }

  eventModified: IEvent =  { uuid: "", organizerUuid: "", name: "", location: "", date: new Date() };


  ngOnInit(): void {
    this.reload();
  }

  
  async updateEventDetails() {
    //console.log(this.eventModified.date)
    await this.eventService.patchEvent( { name: this.eventModified.name, date: this.eventModified.date, location: this.eventModified.location })
      .then(res => {})
      .catch()
  }


  async reload() {
    await this.eventService.getEvent()
      .then(res => {
        this.eventModified = res
      })
      .catch((err: HttpErrorResponse) => {})
  }
}
