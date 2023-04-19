import {Component, OnDestroy, OnInit} from "@angular/core";
import {OrderService} from "src/app/core/services/order.service";
import {EventService} from "src/app/core/services/event.service";
import {IOrderList, IPositions} from "src/app/shared/models/IOrder";
import {Router} from '@angular/router';

@Component({
    selector: "app-order-view",
    templateUrl: "./order-view.component.html",
    styleUrls: ["./order-view.component.css"],
})
export class OrderViewComponent implements OnInit, OnDestroy {

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
        console.log("DESTROY!")
        clearInterval(this.update);
    }

    async loadData() {
        const event = await this.eventService.getEvent();
        this.orderList = await this.orderService.getAllOrders(event);
    }

    createorders() {
        const orderlist: any[] = [];
        this.orderList.forEach((order) => {
            if (order.status == "Ready") {
                orderlist.push(order);
            }
        });
        this.orderList.forEach((order) => {
            if (order.status == "in Progress") {
                orderlist.push(order);
            }
        });
        this.orderList.forEach((order) => {
            if (order.status == "Completed") {
                orderlist.push(order);
            }
        });
        return orderlist;
    }

    async ready(order: IOrderList) {
        await this.orderService.patchOrderBuildBody({status: "Ready"}, order);
        // this.dborders[orderindex]!.status = "Fertig";
        //Datenbank order als completed marken0
    }

    isnotcompleted(order: IOrderList): boolean {
        return order.status != "Completed";
    }

    isready(order: any): boolean {
        return order.status == "Ready";
    }

    ostatus(order: IOrderList) {

        return order.status == "preparation" || order.status == "new";
    }

    async pickup(order: IOrderList) {
        await this.orderService.patchOrderBuildBody({status: "Completed"}, order);
        //this.dborders[orderindex].status = "Completed";
    }

    positionStatus(position: IPositions) {
        try {
            return position.status == "ready";
        } catch {
            return false;
        }
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

    async activeOrders() {
        await this.router.navigateByUrl('/waiter/waiterview');
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
}
