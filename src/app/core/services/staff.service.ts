import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {IEvent} from "../../shared/models/IEvent";
import {IStaff} from "../../shared/models/IStaff";

@Injectable({providedIn: 'root'})
export class StaffService {

    constructor(private apiService: ApiService) {
    }

    // Calls the server endpoint to add a new staff
    async addStaff(event: IEvent, name: string, role: string) {
        await this.apiService.doPostRequest<void>(`/events/${event.uuid}/staff`, {name: name, role: role})
    }

    // Calls the server endpoint to edit a staff member
    async editStaff(event: IEvent, uuid: string, name: string, role: string) {
        await this.apiService.doPatchRequest<void>(`/events/staff`, {uuid: uuid, updates: {name: name, role: role}})
    }

    // Calls the server endpoint to get all staff mebers
    async getStaffs(event: IEvent): Promise<IStaff> {
        return this.apiService.doGetRequest<IStaff>(`/events/${event.uuid}/staff`)
    }

    // Calls the server endpoint to delete a staff member
    async deleteStaff(event: IEvent, uuid: string) {
        await this.apiService.doDeleteRequest<void>(`/events/staff`, {uuid: uuid})
    }

    async getEventUuidFromStaff(uuid: string): Promise<string> {
        return this.apiService.doGetRequest<string>(`/events/staff/${uuid}`)
    }
}
