import {EventService} from '../../../core/services/event.service';
import {Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormControl} from "@angular/forms";
import { IEvent } from 'src/app/models/IEvent';
import { CategoryService } from 'src/app/core/services/category.service';
import { TableService } from 'src/app/core/services/table.service';
import { ITable } from 'src/app/models/ITable';

@Component({
  selector: 'app-add-tables',
  templateUrl: './add-tables.component.html'
})


export class AddtablesComponent implements OnInit {

  constructor(private tableService: TableService, private eventService: EventService) { }

  currentEvent: IEvent = {uuid: "", organizerUuid: "", name: "", location: "", date: new Date() };
  
  tableList: ITable[] = [];
  
  addTablesFormGroup = new FormGroup({
    tableNumber: new FormControl<number | null>(null, {validators: [Validators.required]}),
    multipleTables: new FormControl<boolean | null>(null, {validators: [Validators.required]})
});

  async ngOnInit() {
    await this.reload();
  }

  async addTables() {
    if (this.addTablesFormGroup.controls.multipleTables.value!) {
      await this.tableService.addTables(this.currentEvent, this.addTablesFormGroup.controls.tableNumber.value!)
    } else {
      await this.tableService.addTable(this.currentEvent, this.addTablesFormGroup.controls.tableNumber.value!)
    }
    await this.reload();
    this.addTablesFormGroup.controls.tableNumber.setValue(null);
    this.addTablesFormGroup.controls.multipleTables.setValue(null);
  }

  async deleteTable(tableUuid: string) {
    await this.tableService.deleteTable(this.currentEvent, tableUuid);
    await this.reload();
  }

  async reload() {
    this.currentEvent = await this.eventService.getEvent();
    this.tableList = (await this.tableService.getTables(this.currentEvent)).tableList;
    this.tableList.sort(function(a, b){
      return a.tableNumber - b.tableNumber;
    })
  }
}