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

  /* Es sieht so aus, als könnte das HTML Date Element nur ein String in einem festgelegten Format yyyy-mm-dd verarbeiten.
  Daher die Konvertierung siehe unten und der zusätzliche String eventDateAsString. Wenn jemand eine bessere
  Lösung hat, dann gerne abändern */
  eventModified: IEvent =  { uuid: "", organizerUuid: "", name: "", location: "", date: new Date() };
  eventDateAsString: string = "";


  ngOnInit(): void {
    this.reload();
  }
  
  async updateEventDetails() {
    await this.eventService.patchEvent( { name: this.eventModified.name, date: new Date(this.eventDateAsString), location: this.eventModified.location })
      .then(res => {})
      .catch()
  }


  async reload() {
    await this.eventService.getEvent()
      .then(res => {
        this.eventModified = res;
        this.eventDateAsString = res.date.toString().substring(0,10)
      })
      .catch((err: HttpErrorResponse) => {})
  }
}
