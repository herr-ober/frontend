import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {IEvent} from "../../models/IEvent";

@Injectable({providedIn: 'root'})
export class StaffService {

    constructor(private apiService: ApiService) {
    }

    async addStaff(event: IEvent, name: string, role: string) {
        await this.apiService.doPostRequest<void>(`/events/${event.event.uuid}/staff`, {name: name, role: role})
    }
}