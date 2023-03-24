import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-new-event',
  templateUrl: './create-new-event.component.html',
  styleUrls: ['./create-new-event.component.css']
})
export class CreateNewEventComponent implements OnInit {

  constructor() { }

  eventName: string | undefined;
  eventLocation: string | undefined;
  eventDate: Date | undefined;

  ngOnInit(): void {
  }


  test(): void {
    console.log(this.eventName + " " + this.eventDate + " " + this.eventLocation)
  }

}
