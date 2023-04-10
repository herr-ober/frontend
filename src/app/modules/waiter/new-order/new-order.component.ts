import { CategoryService } from './../../../core/services/category.service';
import { ICategory } from './../../../models/ICategory';
import { IEvent } from 'src/app/models/IEvent';
import { EventService } from './../../../core/services/event.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IProduct } from 'src/app/models/IProduct';
import { ICreateNewOrder } from 'src/app/models/IOrder';
import { ProductService } from 'src/app/core/services/product.service';
import { ITable } from 'src/app/models/ITable';
import { TableService } from 'src/app/core/services/table.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})

export class NewOrderComponent implements OnInit {

  constructor (private eventService: EventService, private categoryService: CategoryService, private productService: ProductService, private tableServive: TableService) {}

  currentEvent: IEvent =  { uuid: "", organizerUuid: "", name: "", location: "", date: new Date() };
  newOrder: ICreateNewOrder = { eventUuid: "", staffUuid: "", tableUuid: "", positions: [] };
  /* Super unschön, aber leider bekomme ich sonst nirgendwo her den Name des Produkts in der Bestellung */
  allProducts: IProduct[] = [];
  productCategories: ICategory[] = [];
  productsFromCategory: IProduct[] = [];
  tablesOfEvent: ITable[] = [];


  private reviewOrderModalVisible: boolean = false;
  private selectTableModalVisible: boolean = false;

  
  ngOnInit() {
    this.reload();
  }


  async switchSelectedCategory(category: string) {
    await this.productService.getProductsByCategory(this.currentEvent, category)
    .then(res => { this.productsFromCategory = res.productList })
    .catch((err: HttpErrorResponse) => {})
  }


  getAmountOfProductInNewOrder(uuid: string): number {
    let pos = this.newOrder.positions.findIndex(e => e.productUuid === uuid);
    
    if (pos > -1)
      return this.newOrder.positions[pos].amount;
    return 0;
  }


  /* Deletes products from array, if ordererd amout has been reduced back down to 0 */
  decrementProductInNewOrder(uuid: string): void {
    let pos = this.newOrder.positions.findIndex(e => e.productUuid === uuid);

    if (pos > -1 && this.newOrder.positions[pos].amount > 0) {
      this.newOrder.positions[pos].amount --;

      /* Only returns products with order amouts > 0 */
      let filtered = this.newOrder.positions.filter(function (el) {
        return el.amount > 0;
      });
      this.newOrder.positions = filtered;
    }
  }

  incrementProductInNewOrder(uuid: string): void {
    let pos = this.newOrder.positions.findIndex(e => e.productUuid === uuid);

    if (pos > -1) {
      this.newOrder.positions[pos].amount ++;
    /* If no order what so ever has been initialized yet ... */
    } else {
      this.newOrder.eventUuid = this.currentEvent.uuid
      this.newOrder.positions[this.newOrder.positions.length] = { productUuid: uuid, amount: 1}
    }
  }

  setTableOfOrder(uuid: string) {
    console.log(uuid)
    this.newOrder.tableUuid = uuid;
    this.switchSelectTableModal();
  }

  async submitNewOrder(){
    if (this.newOrder.positions.length > 0 && this.newOrder.tableUuid != "") {
    } else {
      console.log("Fehler")
    }
  }


  private async reload() {
    await this.eventService.getEvent()
    .then(res => { this.currentEvent = res; this.newOrder.eventUuid = res.uuid })
    .catch((err: HttpErrorResponse) => {})

    await this.categoryService.getCategories()
    .then(res => { this.productCategories = res.categoryList })
    .catch((err: HttpErrorResponse) => {})

    await this.tableServive.getTables(this.currentEvent)
    .then(res => { this.tablesOfEvent = res.tableList })
    .catch((err: HttpErrorResponse) => {})

    /* Unschön, aber muss leider, wie oben erklärt, sein ... */
    await this.productService.getProducts(this.currentEvent)
    .then(res => { this.allProducts = res.productList })
    .catch((err: HttpErrorResponse) => {})
  }


  @HostListener('document:click', ['$event'])
  onClick(e: MouseEvent) {
    let clickedID: String = (e.target as Element).id;
    if (clickedID !== null) {
      if (this.reviewOrderModalVisible && (clickedID == "review-new-order-modal-background")) {
        this.switchReviewNewOrderModal();
      } else if (this.selectTableModalVisible && (clickedID == "select-table-modal-background")) {
        this.switchSelectTableModal();
      }
    }
  }

  switchReviewNewOrderModal() {
    let reviewNewOrderModal = document.getElementById("review-new-order-modal");
    if (reviewNewOrderModal !== null) {
      if (!this.reviewOrderModalVisible) {
        reviewNewOrderModal!.style.display = "block";
        this.reviewOrderModalVisible = true;
        console.log(this.newOrder)
      } else {
        reviewNewOrderModal!.style.display = "none";
        this.reviewOrderModalVisible = false;
      }
    }
  }

  switchSelectTableModal() {
    let selectTableModal = document.getElementById("select-table-modal");
    if (selectTableModal !== null) {
      if (!this.selectTableModalVisible) {
        selectTableModal!.style.display = "block";
        this.selectTableModalVisible = true;
      } else {
        selectTableModal!.style.display = "none";
        this.selectTableModalVisible = false;
      }
    }
  }

  convertProductUuidToProductName(uuid: string): string {

    let pos = this.allProducts.findIndex(e => e.uuid === uuid);
    return this.allProducts[pos].name;
  }

  convertTableUuidToTableNumber(uuid: string): any {

    if (uuid != "") {
      let pos = this.tablesOfEvent.findIndex(e => e.uuid === uuid);
      return this.tablesOfEvent[pos].tableNumber;
    }
    return "";
  }
}