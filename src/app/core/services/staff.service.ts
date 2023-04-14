import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {IEvent} from "../../models/IEvent";
import {IStaff} from "../../models/IStaff";

@Injectable({providedIn: 'root'})
export class StaffService {

    constructor(private apiService: ApiService) {}

    async addStaff(event: IEvent, name: string, role: string) {
        await this.apiService.doPostRequest<void>(`/events/${event.uuid}/staff`, {name: name, role: role})
    }

    async editStaff(event: IEvent, uuid: string, name: string, role: string) {
        await this.apiService.doPatchRequest<void>(`/events/staff`, {uuid: uuid, updates: {name: name, role: role}})
    }

    async getStaffs(event: IEvent): Promise<IStaff> {
        return this.apiService.doGetRequest<IStaff>(`/events/${event.uuid}/staff`)
    }

    async deleteStaff(event: IEvent, uuid: string) {
        await this.apiService.doDeleteRequest<void>(`/events/staff`, {uuid: uuid})
    }
}
