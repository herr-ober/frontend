import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizer-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardOrganizerComponent implements OnInit {

  constructor() { }

  createModal: Boolean = false;

  ngOnInit(): void {
  }

  openModal() {
    this.createModal = true;
    }
}
