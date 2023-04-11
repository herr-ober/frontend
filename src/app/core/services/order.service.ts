import { ICreateNewOrder, IOrder } from 'src/app/models/IOrder';
import {ICreateEvent, IEvent, IUpdateEvent} from '../../models/IEvent';
import {ApiService} from "./api.service";
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class OrderService {

    constructor(private apiService: ApiService) { }

    async postOrder(body: ICreateNewOrder, event: IEvent): Promise< { orderUuid: string } > {
        return this.apiService.doPostRequest(`/events/${event.uuid}/orders`, body )
    }

    async getOrderbyUuid(uuid: string): Promise<IOrder> {
        return this.apiService.doGetRequest(`/events/orders/${uuid}`)
    }

    async patchOrder(body: IUpdateEvent): Promise<void> {
        return this.apiService.doPatchRequest('/events', { updates: body })
    }
}