import { Component, HostListener, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/services/order.service";
import { EventService } from "src/app/core/services/event.service";
import { IOrderList, IPositions } from "src/app/models/IOrder";
import { IEvent } from "src/app/models/IEvent";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: "app-kitchenview",
  templateUrl: "./kitchenview.component.html",
  styleUrls: ["./kitchenview.component.css"],
})
export class KitchenviewComponent {
  dborders: IOrderList[] = [];
  ordervergleich = this.dborders;
  constructor(
    private orderService: OrderService,
    private eventService: EventService,
    private router: Router,
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

  /**
   * The function retrieves an event and calls the functions loaddata and reaload then.
   */
  private async onstart() {
    await this.eventService
      .getEvent()
      .then((res) => {
        this.currentEvent = res;
      })
      .catch((err: HttpErrorResponse) => {});

    this.loaddata();
    this.reload();
  }

  async loaddata() {
    this.dborders = await this.orderService.getKitchenOrders(this.currentEvent);
  }

  private async reload() {
    await this.Sleep(2000);
      

      this.dborders = await this.orderService.getKitchenOrders(this.currentEvent);
      console.log(this.dborders)
      this.reload()
  }


  async positionready(order: IOrderList, position: IPositions) {
    await this.orderService
      .patchPosition({ status: "ready" }, position)
      .then(res => {})
      .catch();
      this.loaddata()

    //this.orders[order].food[foodindex].amount
    //this.dborders[orderid].positions[foodid].status = "ready";
  }

  inQuery(order: any): boolean {
    
    return (order.status == "new");
  }

  inProgress(order: any) {
    return order.status == "preparation";
  }


  Sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
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
    await this.orderService.patchOrderBuildBody({ status: "preparation" }, order);
    this.loaddata()

  }

  async complete(order: IOrderList) {
    //await this.Sleep(10000)
    await this.orderService.patchOrderBuildBody({ status: "ready" }, order);
    this.loaddata()


    //this.dborders[orderindex].status = "ready";
  }

  ostatus(orderindex: number) {
    return this.dborders[orderindex].status == "ready";
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

  async setReady(position: IPositions){
    await this.orderService
    .patchPosition({ status: "ready" }, position)
    .then()
    .catch();
  
  this.loaddata()
  }

  getGermanText(status: string): string{
    if(status == "new"){
      return "Wartend"

    }
    else if(status == "preparation"){
      return "in Bearbeitung"

    }
    else if(status == "completed"){
      return "Abgeschlossen"

    }
    return ""
    
  }

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roll');
    this.router.navigate(['']);   
  }
}
