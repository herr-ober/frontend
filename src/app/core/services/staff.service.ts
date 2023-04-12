import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {IEvent} from "../../models/IEvent";
import {HttpClient} from "@angular/common/http";
import {IStaff} from "../../models/IStaff";
import {firstValueFrom} from "rxjs";

@Injectable({providedIn: 'root'})
export class StaffService {

    constructor(private apiService: ApiService, private httpClient: HttpClient) {}

    async addStaff(event: IEvent, name: string, role: string) {
        await this.apiService.doPostRequest<void>(`/events/${event.uuid}/staff`, {name: name, role: role})
    }

    async editStaff(event: IEvent, uuid: string, name: string, role: string) {
        await this.apiService.doPatchRequest<void>(`/events/staff`, {uuid: uuid, updates: {name: name, role: role}})
    }

    async getStaffs(event: IEvent): Promise<IStaff> {
        return firstValueFrom(this.httpClient.get<IStaff>(`http://localhost:8081/api/events/${event.uuid}/staff`))
    }

    async deleteStaff(event: IEvent, uuid: string) {
        await this.apiService.doDeleteRequest<void>(`/events/staff`, {uuid: uuid})
    }
}
