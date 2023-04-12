import { Component, HostListener, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/services/order.service";
import { EventService } from "src/app/core/services/event.service";
import { IOrder, IOrderList, IPositions } from "src/app/models/IOrder";
import { IEvent } from "src/app/models/IEvent";
import { HttpErrorResponse } from "@angular/common/http";
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
    await this.Sleep(3000);
      

      this.dborders = await this.orderService.getKitchenOrders(this.currentEvent);
      this.reload()
  }

  Ready(orderindex: number) {
    this.dborders[orderindex]!.status = "Ready";
  }

  async positionready(order: IOrder, position: IPositions) {
    await this.orderService
      .patchPosition({ status: "Ready" }, position)
      .then(res => {})
      .catch();
    //this.orders[order].food[foodindex].amount
    //this.dborders[orderid].positions[foodid].status = "Ready";
  }

  async checkorderstatus(order: IOrder) {
    let edit: Boolean = false;

    
    let positions: IPositions[] = order.positions;
    positions.forEach((element: { id: number; status: string }) => {
      

      if (element.status != "Ready") {
        edit = true;
        return;
      }
    });
    
    if (!edit) {
      await this.orderService.patchOrder({ status: "Complete" }, order);
    }
  }

  inQuery(order: any): boolean {
    
    return (order.status == "Waiting" || order.status == "new");
  }

  inProgress(order: any) {
    return order.status == "in Progress" || order.status == "Complete";
  }

  async isReleasable(order: IOrder) {
    
    if(order.status == "Complete"){
      return true
    }
    else
    {
      let edit: boolean = false

      let positions: IPositions[] = order.positions!;
      positions.forEach((element: IPositions) => {

        if (element.status != "Ready") {
          edit = true;
          return;
        }
      });
      
      //await this.checkorderstatus(order)
      if(edit == false){

        return true

      }
      return
    }
    return false
    //return order.status == "Complete";
  }

  isready(order: any): boolean {
    if (order.status == "Ready") {
      return true;
    } else {
      return false;
    }
  }

  Sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  foodstatus(food: any) {
    try {
      return food.status == "Ready";
    } catch {
      return false;
    }

  }

  drinkstatus(drink: any) {
    try {
      return drink.status == "Ready";
    } catch {
      return false;
    }
  }

  async edit(order: IOrder) {
    await this.orderService.patchOrder({ status: "in Progress" }, order);
  }

  async complete(order: IOrder) {
    //await this.Sleep(10000)
    await this.orderService.patchOrder({ status: "Ready" }, order);

    //this.dborders[orderindex].status = "Ready";
  }

  ostatus(orderindex: number) {
    return this.dborders[orderindex].status == "Ready";
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
