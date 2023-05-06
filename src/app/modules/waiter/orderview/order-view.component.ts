import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/services/order.service";
import { IOrderFull, IPositions } from "src/app/shared/models/IOrder";
import { IEvent } from "src/app/shared/models/IEvent";
import { Router } from "@angular/router";

@Component({
  selector: "app-order-view",
  templateUrl: "./order-view.component.html",
  styleUrls: ["./order-view.component.css"],
})
export class OrderViewComponent implements OnInit {
  dborders: IOrderFull[] = [];
  ordervergleich = this.dborders;
  constructor(private orderService: OrderService, private router: Router) {}

  currentEvent: IEvent = {
    uuid: "",
    organizerUuid: "",
    name: "",
    location: "",
    date: new Date(),
  };

  ngOnInit(): void {
    this.reload();
    this.loadData();
  }

  /*
  * loads the data once at start and on explicit call
  */
  async loadData() {
    this.dborders = await this.orderService.getAllOrders(
      localStorage.getItem("eventUuid")!
    );
  }

  /*
  * reloads the data each 2 seconds
  */
  private async reload() {
    await this.Sleep(2000);

    if (this.router.url === "/waiter/orderview") {
      this.dborders = await this.orderService.getAllOrders(
        localStorage.getItem("eventUuid")!
      );
      this.reload();
    }
  }

  /*
  * checks if the order status equals completed
  */
  isNotCompleted(order: IOrderFull): boolean {
    if (order.status == "Completed") {
      return false;
    } else {
      return true;
    }
  }

  /*
  * checks if the order status equals ready
  */
  isReady(order: any): boolean {
    return order.status == "Ready";
  }

  /*
  * sleeps for x milliseconds
  */
  Sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  /*
  * checks if the order status equals preparation
  */
  oStatus(order: IOrderFull) {
    return order.status == "preparation" || order.status == "new";
  }

  /*
  * changes the position status to completed
  */
  async pickUp(order: IOrderFull) {
    await this.orderService
      .patchOrderBuildBody({ status: "Completed" }, order)
      .then()
      .catch();
    //this.dborders[orderindex].status = "Completed";
  }

  /*
  * checks if the position is a drink
  */
  isDrink(category: string) {
    return (
      category == "Alkoholische Getränke" || category == "Alkoholfreie Getränke"
    );
  }

  /*
  * checks if the position is a food
  */
  isFood(category: string) {
    return !(
      category == "Alkoholische Getränke" || category == "Alkoholfreie Getränke"
    );
  }

  /*
   * Navigates
   */
  startOrder() {
    this.router.navigateByUrl("/waiter/neworder");
  }

  /*
   * Navigates
   */
  activeOrders() {
    this.router.navigateByUrl("/waiter/waiterview");
  }

  /*
   * checks if the position status equals ready
   */
  positionStatusReady(position: IPositions) {
    try {
      return position.status == "ready";
    } catch {
      return false;
    }
  }

  /*
   * checks if the position status equals waiting
   */
  positionStatusWaiting(position: IPositions) {
    try {
      return position.status == "waiting";
    } catch {
      return false;
    }
  }

  /*
   * checks if the position status equals delivered
   */
  positionStatusDelivered(position: IPositions) {
    try {
      return position.status == "delivered";
    } catch {
      return false;
    }
  }

  /*
   * Translates Status-text to German
   */
  getGermanText(status: string): string {
    if (status == "new") {
      return "Wartend";
    } else if (status == "preparation") {
      return "in Bearbeitung";
    } else if (status == "completed") {
      return "Abgeschlossen";
    }
    return "";
  }

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.router.navigate([""]);
  }
}
