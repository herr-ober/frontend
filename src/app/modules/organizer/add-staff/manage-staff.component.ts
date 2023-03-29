import {EventService} from '../../../core/services/event.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StaffService} from "../../../core/services/staff.service";

@Component({
  selector: 'app-create-new-event',
  templateUrl: './manage-staff.component.html'
})


export class ManageStaff implements OnInit {

  constructor(private staffService: StaffService, private eventService: EventService) { }

  createStaffFormGroup = new FormGroup({
    name: new FormControl(null, {validators: [Validators.required]}),
    role: new FormControl(null)
  });

  ngOnInit(): void { }


  async addStaff() {
    const event = await this.eventService.getEvent();
    await this.staffService.addStaff(event, this.createStaffFormGroup.controls.name.value!,  this.createStaffFormGroup.controls.role.value!)
    this.createStaffFormGroup.reset();
  }
}
