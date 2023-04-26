import { Component, HostListener, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/services/order.service";
import { EventService } from "src/app/core/services/event.service";
import { IOrderList, IPositions } from "src/app/shared/models/IOrder";
import { IEvent } from "src/app/shared/models/IEvent";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: "app-order-view",
  templateUrl: "./order-view.component.html",
  styleUrls: ["./order-view.component.css"],
})
export class OrderViewComponent implements OnInit {
  
  dborders: IOrderList[] = [];
  ordervergleich = this.dborders;
  constructor(
    private orderService: OrderService,
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

    this.reload();
    this.loaddata();
  }

  async loaddata() {
    this.dborders = await this.orderService.getAllOrders(localStorage.getItem("eventUuid")!);
  }

  private async reload() {
    await this.Sleep(2000);

    if(this.router.url === '/waiter/orderview'){

      this.dborders = await this.orderService.getAllOrders(localStorage.getItem("eventUuid")!);
      this.reload()
      
    }
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
  
  async ready(order: IOrderList) {
    await this.orderService
      .patchOrderBuildBody({ status: "Ready" }, order)
      .then(res => {})
      .catch();
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
    return order.status == "Ready";
  }

  Sleep(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  ostatus(order: IOrderList) {
    
    return order.status == "preparation" || order.status == "new";
  }

  async pickup(order: IOrderList) {
    await this.orderService
      .patchOrderBuildBody({ status: "Completed" }, order)
      .then()
      .catch();
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
  startOrder() {
    this.router.navigateByUrl('/waiter/neworder');

  }
  activeOrders() {
    this.router.navigateByUrl('/waiter/waiterview');

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
    localStorage.removeItem('role');
    this.router.navigate(['']);   
  }
}