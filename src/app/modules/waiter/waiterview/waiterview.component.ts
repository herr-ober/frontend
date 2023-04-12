import { Component, HostListener, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/services/order.service";
import { EventService } from "src/app/core/services/event.service";
import { IOrderList, IOrder, IPositions } from "src/app/models/IOrder";
import { IEvent } from "src/app/models/IEvent";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-waiterview',
  templateUrl: './waiterview.component.html',
  styleUrls: ['./waiterview.component.css']
})
export class WaiterviewComponent implements OnInit{
  
  dborders: IOrderList[] = [];
  ordervergleich = this.dborders;
  constructor(
    private orderService: OrderService,
    private eventService: EventService
  ) {}

  currentEvent: IEvent = {
    uuid: "",
    organizerUuid: "",
    name: "",
    location: "",
    date: new Date(),
  };

  ngOnInit(): void {
    this.onstart();
  }

  private async onstart() {
    await this.eventService
      .getEvent()
      .then((res) => {
        this.currentEvent = res;
      })
      .catch((err: HttpErrorResponse) => {});

    this.reload();
    this.loaddata();
  }

  async loaddata() {
    this.dborders = await this.orderService.getWaiterOrders(this.currentEvent);
  }

  private async reload() {
    await this.Sleep(1000);

      this.dborders = await this.orderService.getWaiterOrders(this.currentEvent);
      this.reload()
  }

  createorders() {
    var orderlist: any[] = [];
    this.dborders.forEach((order) => {
      if (order.status == "Ready") {
        orderlist.push(order);
      }
    });
    this.dborders.forEach((order) => {
      if (order.status == "in Progress") {
        orderlist.push(order);
      }
    });
    this.dborders.forEach((order) => {
      if (order.status == "Completed") {
        orderlist.push(order);
      }
    });

    return orderlist;
  }
  
  async ready(order: IOrder) {
    await this.orderService
      .patchOrder({ status: "Ready" }, order)
      .then(res => {})
      .catch();
    // this.dborders[orderindex]!.status = "Fertig";
    //Datenbank order als completed marken0
  }

  isnotcompleted(order: IOrder): boolean {
    if (order.status == "Completed") {
      return false;
    } else {
      return true;
    }
  }

  isready(order: any): boolean {
    return order.status == "Ready";
  }

  Sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  ostatus(order: IOrder) {
    
    return order.status == "Ready";
  }

  async pickup(order: IOrder) {
    await this.orderService
      .patchOrder({ status: "Completed" }, order)
      .then()
      .catch();
    //this.dborders[orderindex].status = "Completed";
  }

  positionStatus(position: IPositions) {
    try {
      return position.status == "Ready";
    } catch {
      return false;
    }
  }

  isdrink(category: string) {
    return !(
      category == "Alkoholische Getränke" || category == "Alkoholfreie Getränke"
    );
  }
  isfood(category: string) {
    return (
      category == "Alkoholische Getränke" || category == "Alkoholfreie Getränke"
    );
  }
}
