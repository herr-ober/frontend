import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify-event',
  templateUrl: './modify-event.component.html',
  styleUrls: ['./modify-event.component.css']
})
export class ModifyEventComponent implements OnInit {

  constructor() { }

  eventName: string | undefined;
  eventLocation: string | undefined;
  eventDate: Date | undefined;

  ngOnInit(): void {
  }

  updateEventDetails(): void {

  }

}
