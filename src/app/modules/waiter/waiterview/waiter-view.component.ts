import {Component, OnDestroy, OnInit} from "@angular/core";
import {OrderService} from "src/app/core/services/order.service";
import {EventService} from "src/app/core/services/event.service";
import {IOrderList, IPositions} from "src/app/models/IOrder";
import {Router} from '@angular/router';

@Component({
    selector: 'app-waiter-view',
    templateUrl: './waiter-view.component.html',
    styleUrls: ['./waiter-view.component.css']
})
export class WaiterViewComponent implements OnInit, OnDestroy {

    orderList: IOrderList[] = [];
    update: number | undefined;

    constructor(
        private orderService: OrderService,
        private eventService: EventService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.update = setInterval(this.loadData, 2000);
    }

    ngOnDestroy() {
        clearInterval(this.update);
    }

    async loadData() {
        const event = await this.eventService.getEvent();
        this.orderList = await this.orderService.getWaiterOrders(event);
    }

    async ready(order: IOrderList) {
        await this.orderService.patchOrderBuildBody({status: "ready"}, order);
        await this.loadData()

        // this.dborders[orderindex]!.status = "Fertig";
        //Datenbank order als completed marken0
    }

    isnotcompleted(order: IOrderList): boolean {
        return order.status != "Completed";
    }

    isready(order: any): boolean {
        return order.status == "ready";
    }

    ostatus(order: IOrderList) {

        return order.status == "preparation";
    }

    async pickup(order: IOrderList) {
        await this.orderService.patchOrderBuildBody({status: "Completed"}, order);
        await this.loadData()

        //this.dborders[orderindex].status = "Completed";
    }

    positionStatusReady(position: IPositions) {
        try {
            return position.status == "ready";
        } catch {
            return false;
        }
    }

    positionStatusWaiting(position: IPositions) {
        try {
            return position.status == "waiting";
        } catch {
            return false;
        }
    }

    positionStatusDelivered(position: IPositions) {
        try {
            return position.status == "delivered";
        } catch {
            return false;
        }
    }

    async setDelivered(position: IPositions) {
        await this.orderService.patchPosition({status: "delivered"}, position);
        await this.loadData()
    }

    isdrink(category: string) {
        return (
            category == "Alkoholische Getränke" || category == "Alkoholfreie Getränke"
        );
    }

    isfood(category: string) {
        return !(
            category == "Alkoholische Getränke" || category == "Alkoholfreie Getränke"
        );
    }

    async startOrder() {
        await this.router.navigateByUrl('/waiter/neworder');
    }

    async overview() {
        await this.router.navigateByUrl('/waiter/orderview');
    }

    getGermanText(status: string): string {
        if (status == "new") {
            return "Wartend"

        } else if (status == "preparation") {
            return "in Bearbeitung"

        } else if (status == "completed") {
            return "Abgeschlossen"

        }
        return ""

    }

    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        await this.router.navigate(['']);
    }
}
