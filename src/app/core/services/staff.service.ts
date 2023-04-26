import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {IEvent} from "../../shared/models/IEvent";
import {IStaff} from "../../shared/models/IStaff";

@Injectable({providedIn: 'root'})
export class StaffService {

    constructor(private apiService: ApiService) {
    }

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

    async getEventUuidFromStaff(uuid: string): Promise<string> {
        return this.apiService.doGetRequest<string>(`/events/staff/${uuid}`)
    }
}
