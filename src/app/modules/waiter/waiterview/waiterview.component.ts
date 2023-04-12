import { Component, HostListener, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/services/order.service";
import { EventService } from "src/app/core/services/event.service";
import { IOrder, IOrderList, IPositions } from "src/app/models/IOrder";
import { IEvent } from "src/app/models/IEvent";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';

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
    private eventService: EventService,
    private router: Router
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
    await this.Sleep(2000);
    console.log(this.dborders)

      this.dborders = await this.orderService.getWaiterOrders(this.currentEvent);
      this.reload()
  }


  
  async ready(order: IOrderList) {
    await this.orderService
      .patchOrderBuildBody({ status: "ready" }, order)
      .then(res => {})
      .catch();
      this.loaddata()

    // this.dborders[orderindex]!.status = "Fertig";
    //Datenbank order als completed marken0
  }

  isnotcompleted(order: IOrderList): boolean {
    if (order.status == "Completed") {
      return false;
    } else {
      return true;
    }
  }

  isready(order: any): boolean {
    return order.status == "ready";
  }

  Sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  ostatus(order: IOrderList) {
    
    return order.status == "preparation";
  }

  async pickup(order: IOrderList) {
    await this.orderService
      .patchOrderBuildBody({ status: "Completed" }, order)
      .then()
      .catch();
      this.loaddata()

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

  async setDelivered(position: IPositions){
    await this.orderService
    .patchPosition({ status: "delivered" }, position)
    .then()
    .catch();
    this.loaddata()

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
  startOrder() {
    this.router.navigateByUrl('/waiter/neworder');

  }

  overview() {
    this.router.navigateByUrl('/waiter/orderview');

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
