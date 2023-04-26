import { StaffService } from './../../../core/services/staff.service';
import {CategoryService} from '../../../core/services/category.service';
import {ICategory} from '../../../shared/models/ICategory';
import {EventService} from '../../../core/services/event.service';
import {Component, HostListener, OnInit} from '@angular/core';
import {IProduct} from 'src/app/shared/models/IProduct';
import {ICreateNewOrder, IOrder} from 'src/app/shared/models/IOrder';
import {ProductService} from 'src/app/core/services/product.service';
import {ITable} from 'src/app/shared/models/ITable';
import {TableService} from 'src/app/core/services/table.service';
import {OrderService} from 'src/app/core/services/order.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-new-order',
    templateUrl: './new-order.component.html',
})

export class NewOrderComponent implements OnInit {

    currentEventUuid: string = ""

    newOrder: ICreateNewOrder = { tableUuid: "", positions: [], notes: undefined };
    tableNumberEnteredManually: number = 0;

    submittedOrderUuid: string = "";
    submittedOrder: IOrder = { uuid: "", eventUuid: "", staffUuid: "", tableUuid: "", paid: false, status: "", positions: [], notes: ""}
    totalAmountSubmittedOrder: number = 0;

    /* Super unschön, aber leider bekomme ich sonst nirgendwo her der Name des Produkts und den Preis in der Bestellung */
    allProducts: IProduct[] = [];
    productCategories: ICategory[] = [];
    productsFromCategory: IProduct[] = [];
    tablesOfEvent: ITable[] = [];

    private reviewOrderModalVisible: boolean = false;
    private selectTableModalVisible: boolean = false;
    private orderConfirmationModalVisible: boolean = false;

    constructor(private eventService: EventService, private categoryService: CategoryService, private productService: ProductService, private tableServive: TableService, private orderService: OrderService, private staffService: StaffService, private router: Router) {
    }

    async ngOnInit() {       
        this.productCategories = (await this.categoryService.getCategories()).categoryList;
        this.tablesOfEvent = (await this.tableServive.getTables(localStorage.getItem("eventUuid")!)).tableList;
        
        /* Unschön, aber muss leider, wie oben erklärt, sein ... */
        this.allProducts = (await this.productService.getProducts(localStorage.getItem("eventUuid")!)).productList;
    }

    async switchSelectedCategory(category: string) {
        this.productsFromCategory = (await this.productService.getProductsByCategory(localStorage.getItem("eventUuid")!, category)).productList;
    }

    getAmountOfProductInNewOrder(uuid: string): number {
        let pos = this.newOrder.positions.findIndex(e => e.productUuid === uuid);
        if (pos > -1) return this.newOrder.positions[pos].amount;
        return 0;
    }


    /* Deletes products from array, if ordererd amout has been reduced back down to 0 */
    decrementProductInNewOrder(uuid: string): void {
        let pos = this.newOrder.positions.findIndex(e => e.productUuid === uuid);

        if (pos > -1 && this.newOrder.positions[pos].amount > 0) {
            this.newOrder.positions[pos].amount--;

            /* Only returns products with order amouts > 0 */
            this.newOrder.positions = this.newOrder.positions.filter(function (el) {
                return el.amount > 0;
            });
        }
    }

    incrementProductInNewOrder(uuid: string): void {
        let pos = this.newOrder.positions.findIndex(e => e.productUuid === uuid);

        if (pos > -1) {
            this.newOrder.positions[pos].amount++;
            /* If no order whatsoever has been initialized yet ... */
        } else {
            this.newOrder.positions[this.newOrder.positions.length] = {productUuid: uuid, amount: 1}
        }
    }

    setTableOfOrder(uuid: string) {
        this.newOrder.tableUuid = uuid;
        this.switchSelectTableModal();
    }

    setTableOfOrderManualInput() {
        let pos = this.tablesOfEvent.findIndex(e => e.tableNumber === this.tableNumberEnteredManually);
        if (pos > -1) {
            this.setTableOfOrder(this.tablesOfEvent[pos].uuid);
        }
        else
            this.displayErrorNotificationSelectTable("Der angeforderte Tisch existiert nicht.")
    }

    async submitNewOrder() {
        if (this.newOrder.positions.length > 0 && this.newOrder.tableUuid != "") {
            await this.orderService.postOrder(this.newOrder, {uuid: localStorage.getItem("eventUuid")!, organizerUuid: "", name: "", location: "", date: new Date()})
                .then(res => {
                    this.submittedOrderUuid = res.orderUuid
                    this.switchReviewNewOrderModal();
                    this.switchOrderConfirmationModal();
                });
        } else {
            this.displayErrorNotificationOrderReview("Die Bestellung darf nicht leer sein und muss einem Tisch zugewiesen sein.")
        }
    }

    async markOrderAsPaid() {
        await this.orderService.patchOrder({uuid: this.submittedOrderUuid, updates: {paid: true}})
            .then(() => {
                this.router.navigate(['/waiter']);
            });
    }

    @HostListener('document:click', ['$event'])
    async onClick(e: MouseEvent) {
        let clickedID: String = (e.target as Element).id;
        if (clickedID !== null) {
            if (this.reviewOrderModalVisible && (clickedID == "review-new-order-modal-background")) {
                this.switchReviewNewOrderModal();
            } else if (this.selectTableModalVisible && (clickedID == "select-table-modal-background")) {
                this.switchSelectTableModal();
            } else if (this.orderConfirmationModalVisible && (clickedID == "order-confirmation-modal-background")) {
                await this.switchOrderConfirmationModal();
            }
        }
    }

    switchReviewNewOrderModal() {
        let reviewNewOrderModal = document.getElementById("review-new-order-modal");
        if (reviewNewOrderModal !== null) {
            if (!this.reviewOrderModalVisible) {
                reviewNewOrderModal!.style.display = "block";
                this.reviewOrderModalVisible = true;
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
                this.tableNumberEnteredManually = this.convertTableUuidToTableNumber(this.newOrder.tableUuid);
            } else {
                selectTableModal!.style.display = "none";
                this.selectTableModalVisible = false;
            }
        }
    }

    async switchOrderConfirmationModal() {
        let confirmationOrderModal = document.getElementById("order-confirmation-modal");

        if (confirmationOrderModal !== null) {
            if (!this.orderConfirmationModalVisible) {
                this.submittedOrder = await this.orderService.getOrderbyUuid(this.submittedOrderUuid);
                confirmationOrderModal!.style.display = "block";
                this.orderConfirmationModalVisible = true;
            } else {
                confirmationOrderModal!.style.display = "none";
                this.orderConfirmationModalVisible = false;
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

    convertProductUuidToPrice(uuid: string): number {
        let pos = this.allProducts.findIndex(e => e.uuid === uuid);
        return this.allProducts[pos].price
    }

    calcTotalAmountOfOrder(): number {
        let total = 0;
        for (let position of this.submittedOrder.positions) {
            total = total + position.amount * this.convertProductUuidToPrice(position.productUuid);
        }
        return total;
    }

    displayErrorNotificationOrderReview(msg: string): void {
        let eventErrorNotification = document.getElementById("review-order-notification");
        eventErrorNotification!.innerHTML = msg;
        eventErrorNotification!.style.display = "block";
    }

    displayErrorNotificationSelectTable(msg: string): void {
        let eventErrorNotification = document.getElementById("select-table-notification");
        eventErrorNotification!.innerHTML = msg;
        eventErrorNotification!.style.display = "block";
    }

    async switchToWaiterView() {
        await this.router.navigate(['/waiter']);
    }

    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigate(['']);   
      }
}
