import { Observable } from "rxjs";
import { ApiService } from "./api.service";

export class EventService {


    constructor(private apiService: ApiService) { }


    async getEven(): Promise<void> {
        return this.apiService.doGetRequest('/')
    }


}