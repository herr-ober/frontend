import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { IEvent } from "src/app/models/IEvent";
import { ITable } from "src/app/models/Itable";


@Injectable({providedIn: 'root'})
export class TableService {


    constructor(private apiService: ApiService, private httpClient: HttpClient) {}

    async getTables(event: IEvent): Promise <{ tableList: ITable[] }>{
        return this.apiService.doGetRequest(`/events/${event.uuid}/tables`)
    }
}