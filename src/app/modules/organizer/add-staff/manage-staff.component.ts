import {EventService} from '../../../core/services/event.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StaffService} from "../../../core/services/staff.service";
import {IStaffItem} from "../../../shared/models/IStaff";

@Component({
    selector: 'app-create-new-event',
    templateUrl: './manage-staff.component.html'
})


export class ManageStaff implements OnInit {

    editStaffUUID: string | undefined;
    createStaffFormGroup = new FormGroup({
        name: new FormControl<string | null>(null, {validators: [Validators.required]}),
        role: new FormControl("Waiter")
    });
    editStaffFormGroup = new FormGroup({
        name: new FormControl<string | null>(null, {validators: [Validators.required]}),
        role: new FormControl("Waiter")
    });
    staffList = Array<IStaffItem>();

    constructor(private staffService: StaffService, private eventService: EventService) {
    }

    async ngOnInit() {
        await this.updateStaffList();
    }

    async addStaff() {
        const event = await this.eventService.getEvent();
        await this.staffService.addStaff(event, this.createStaffFormGroup.controls.name.value!, this.createStaffFormGroup.controls.role.value!.toLowerCase())
        this.createStaffFormGroup.controls.name.setValue("");
        this.createStaffFormGroup.controls.role.setValue("Waiter");
        await this.updateStaffList();
    }

    async editStaffSetup(staffItem: IStaffItem) {
        this.editStaffUUID = staffItem.uuid;
        this.editStaffFormGroup.controls.name.setValue(staffItem.name);
        this.editStaffFormGroup.controls.role.setValue(this.staffRoleCapitalized(staffItem));
    }

    async editStaff() {
        const event = await this.eventService.getEvent();
        const uuid = this.editStaffUUID;
        if (!uuid) return;
        await this.staffService.editStaff(event, uuid, this.editStaffFormGroup.controls.name.value!, this.editStaffFormGroup.controls.role.value!);
        this.editStaffUUID = undefined;
        await this.updateStaffList();
    }

    async deleteStaff(uuid: string) {
        await this.staffService.deleteStaff(await this.eventService.getEvent(), uuid);
        await this.updateStaffList();
    }

    async updateStaffList() {
        const staff = await this.staffService.getStaffs(await this.eventService.getEvent());
        this.staffList = staff.staffList;
    }

    staffRoleCapitalized(staffItem: IStaffItem): string {
        const role = staffItem.role.toLowerCase();
        return role[0].toUpperCase() + role.slice(1);
    }
}
