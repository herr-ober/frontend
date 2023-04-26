import {Component, OnDestroy, OnInit} from "@angular/core";
import {OrderService} from "src/app/core/services/order.service";
import {EventService} from "src/app/core/services/event.service";
import {IOrderList, IPositions} from "src/app/shared/models/IOrder";
import {Router} from "@angular/router";

@Component({
    selector: "app-kitchen-view",
    templateUrl: "./kitchen-view.component.html",
})
export class KitchenViewComponent implements OnInit, OnDestroy {

    orderList: IOrderList[] = [];
    update: any;

    constructor(private orderService: OrderService, private eventService: EventService, private router: Router) {
    }

    ngOnInit() {
        this.update = setInterval(this.loadData, 2000);
    }

    ngOnDestroy() {
        clearInterval(this.update);
    }

    async loadData() {
        //const event = await this.eventService.getEvent();
        this.orderList = await this.orderService.getKitchenOrders(localStorage.getItem("eventUuid")!);
    }

    async positionready(order: IOrderList, position: IPositions) {
        await this.orderService.patchPosition({status: "ready"}, position);
        await this.loadData()

        //this.orders[order].food[foodindex].amount
        //this.dborders[orderid].positions[foodid].status = "ready";
    }

    inQuery(order: any): boolean {
        return (order.status == "new");
    }

    inProgress(order: any) {
        return order.status == "preparation";
    }

    foodstatus(food: any) {
        try {
            return food.status == "ready";
        } catch {
            return false;
        }

    }

    drinkstatus(drink: any) {
        try {
            return drink.status == "ready";
        } catch {
            return false;
        }
    }

    async edit(order: IOrderList) {
        await this.orderService.patchOrderBuildBody({status: "preparation"}, order);
        await this.loadData()
    }

    async complete(order: IOrderList) {
        //await this.Sleep(10000)
        await this.orderService.patchOrderBuildBody({status: "ready"}, order);
        await this.loadData()
        //this.dborders[orderindex].status = "ready";
    }

    ostatus(orderindex: number) {
        return this.orderList[orderindex].status == "ready";
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

    async setReady(position: IPositions) {
        await this.orderService.patchPosition({status: "ready"}, position);
        await this.loadData()
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
        localStorage.clear();
        await this.router.navigate(["/auth/login/staff"]);
    }
}
