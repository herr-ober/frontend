import { ICreateNewOrder } from 'src/app/models/IOrder';
import {ICreateEvent, IEvent, IUpdateEvent} from '../../models/IEvent';
import {ApiService} from "./api.service";
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class OrderService {

    constructor(private apiService: ApiService) { }

    async postOrder(body: ICreateNewOrder): Promise<IEvent> {
        return this.apiService.doPostRequest('/events', body)
    }
}