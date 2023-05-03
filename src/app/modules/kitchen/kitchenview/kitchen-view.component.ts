import { Component, HostListener, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/services/order.service";
import { EventService } from "src/app/core/services/event.service";
import { IOrderFull, IPositions } from "src/app/shared/models/IOrder";
import { IEvent } from "src/app/shared/models/IEvent";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { CategoryService } from "src/app/core/services/category.service";
import { ProductService } from "src/app/core/services/product.service";
import { ICategory } from "src/app/shared/models/ICategory";
import { IProduct } from "src/app/shared/models/IProduct";

@Component({
  selector: "app-kitchen-view",
  templateUrl: "./kitchen-view.component.html"
})
export class KitchenViewComponent{
  dborders: IOrderFull[] = [];
  ordervergleich = this.dborders;

  productCategories: ICategory[] = [];
  productsFromCategories: Map<string, IProduct[]> = new Map([
      ["", []],
  ])

  private lockProductsModalVisible: boolean = false;

  constructor(
    private orderService: OrderService,
    private eventService: EventService,
    private categoryService: CategoryService,
    private productService: ProductService,
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
    this.loaddata();
    this.reload();
  }

  async loaddata() {
    this.dborders = await this.orderService.getKitchenOrders(localStorage.getItem("eventUuid")!);
  }

  private async reload() {
    await this.Sleep(2000);

      if(this.router.url === '/kitchen' || this.router.url === '/kitchen/kitchenview'){

        this.dborders = await this.orderService.getKitchenOrders(localStorage.getItem("eventUuid")!);
        this.reload()

      }
  }


  async positionready(order: IOrderFull, position: IPositions) {
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

  async edit(order: IOrderFull) {
    await this.orderService.patchOrderBuildBody({ status: "preparation" }, order);
    this.loaddata()

  }

  async complete(order: IOrderFull) {
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


  //lock products
  @HostListener('document:click', ['$event'])
  async onClick(e: MouseEvent) {
      let clickedID: String = (e.target as Element).id;
      if (clickedID !== null) {
          if (this.lockProductsModalVisible && (clickedID == "lock-products-modal-background")) {
              this.switchLockProductsModal();
          }
      }
  }

  switchLockProductsModal() {
      this.loadProducts();
      let lockProductsModal = document.getElementById("lock-products-modal");
      if (lockProductsModal !== null) {
          if (!this.lockProductsModalVisible) {
              lockProductsModal!.style.display = "block";
              this.lockProductsModalVisible = true;
          } else {
              lockProductsModal!.style.display = "none";
              this.lockProductsModalVisible = false;
          }
      }
  }

  async loadProducts() {
    this.productCategories = (await this.categoryService.getCategories()).categoryList;
    this.productsFromCategories.delete("");
    for (const category of this.productCategories) {
        this.productsFromCategories.set(category.name, (await this.productService.getProductsByCategory(localStorage.getItem("eventUuid")!, category.uuid)).productList)
    }
}
  async lockProduct(uuid: string){
    await this.productService.updateProduct({uuid: uuid, updates: {available: false}})
    await this.loadProducts()
  }

  async unlockProduct(uuid: string){
    await this.productService.updateProduct({uuid: uuid, updates: {available: true}})
    await this.loadProducts()
  }

  	//lock Products
  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roll');
    this.router.navigate(['']);   
  }
}