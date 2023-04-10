import {EventService} from '../../../core/services/event.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TableService} from "../../../core/services/table.service";
import {ITable} from "../../../models/Itable";

@Component({
    selector: 'app-create-new-event',
    templateUrl: './manage-tables.component.html'
})


export class ManageTables implements OnInit {

    constructor(private tableService: TableService, private eventService: EventService) {
    }

    editStaffUUID: string | undefined;

    createTableFormGroup = new FormGroup({
        tableNumber: new FormControl<string | null>(null, {validators: [Validators.required]}),
    });

    tableList = Array<ITable>();

    async ngOnInit() {
        await this.updateTableList();
    }

    async addTable() {
        const event = await this.eventService.getEvent();
        await this.tableService.addTable(event, parseInt(this.createTableFormGroup.controls.tableNumber.value!))
        this.createTableFormGroup.controls.tableNumber.setValue("");
        await this.updateTableList();
    }

    async deleteTable(uuid: string) {
        await this.tableService.deleteTable(await this.eventService.getEvent(), uuid);
        await this.updateTableList();
    }

    async updateTableList() {
        const staff = await this.tableService.getTables(await this.eventService.getEvent())
        this.tableList = staff.tableList;
    }
}
