import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {IEvent} from "src/app/models/IEvent";
import {ITable} from "src/app/models/ITable";


@Injectable({providedIn: 'root'})
export class TableService {

    constructor(private apiService: ApiService) {
    }

    async getTables(event: IEvent): Promise<{ tableList: ITable[] }> {
        return this.apiService.doGetRequest(`/events/${event.uuid}/tables`)
    }

    async addTable(event: IEvent, tableNumber: number) {
        await this.apiService.doPostRequest<void>(`/events/${event.uuid}/tables`, {tableNumber: tableNumber})
    }

    async addTables(event: IEvent, tableNumber: number) {
        await this.apiService.doPostRequest<void>(`/events/${event.uuid}/tables/bulk`, {tableNumber: tableNumber})
    }

    async deleteTable(event: IEvent, tableUuid: string) {
        await this.apiService.doDeleteRequest<void>(`/events/${event.uuid}/tables`, {uuid: tableUuid})
    }
}
