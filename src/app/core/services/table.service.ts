import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {IEvent} from "src/app/shared/models/IEvent";
import {ITable} from "src/app/shared/models/ITable";


@Injectable({providedIn: 'root'})
export class TableService {

    constructor(private apiService: ApiService) {
    }

    async getTables(eventUuid: string): Promise<{ tableList: ITable[] }> {
        return this.apiService.doGetRequest(`/events/${eventUuid}/tables`)
    }

    async addTable(eventUuid: string, tableNumber: number) {
        await this.apiService.doPostRequest<void>(`/events/${eventUuid}/tables`, {tableNumber: tableNumber})
    }

    async addTables(eventUuid: string, tableNumber: number) {
        await this.apiService.doPostRequest<void>(`/events/${eventUuid}/tables/bulk`, {tableNumber: tableNumber})
    }

    async deleteTable(eventUuid: string, tableUuid: string) {
        await this.apiService.doDeleteRequest<void>(`/events/${eventUuid}/tables`, {uuid: tableUuid})
    }
}
