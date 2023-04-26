import {
    ICreateNewOrder,
    IMap,
    IOrder,
    IOrderList,
    IPatchOrder,
    IPositions,
    IPositionStatus
} from 'src/app/shared/models/IOrder';
import {IEvent} from '../../shared/models/IEvent';
import {ITable, ITableMap} from '../../shared/models/ITable';
import {IProduct} from '../../shared/models/IProduct';
import {ApiService} from "./api.service";
import {Injectable} from '@angular/core';
import {ProductService} from './product.service';
import {CategoryService} from './category.service';
import {TableService} from './table.service';
import {ICategory, ICategoryMap} from 'src/app/shared/models/ICategory';


@Injectable({
    providedIn: 'root'
})

export class OrderService {
    gotproducts: boolean = false

    category: ICategoryMap = {}
    table: ITableMap = {}
    map: IMap = {}

    constructor(private apiService: ApiService, private productSevice: ProductService, private categoryService: CategoryService, private tableService: TableService) {
    }

    async postOrder(body: ICreateNewOrder, event: IEvent): Promise<{ orderUuid: string }> {
        return this.apiService.doPostRequest(`/events/${event.uuid}/orders`, body)
    }

    async getOrderbyUuid(uuid: string): Promise<IOrder> {
        return this.apiService.doGetRequest(`/events/orders/${uuid}`)
    }

    async patchOrder(body: any): Promise<void> {
        return this.apiService.doPatchRequest(`/events/orders`, body)
    }

    /*async postOrderBuildBody(body: ICreateNewOrder, event: IEvent): Promise<ICreateNewOrder> {
        return this.apiService.doPostRequest(`/events/${event.uuid}/orders`, body )
    }*/

    async patchOrderBuildBody(body: IPatchOrder, order: IOrderList): Promise<IPatchOrder> {
        return this.apiService.doPatchRequest(`/events/orders`, {uuid: order.orderUuid, updates: body})

    }

    async patchPosition(body: IPositionStatus, position: IPositions): Promise<IPositionStatus> {
        return this.apiService.doPatchRequest(`/events/orders/positions`, {uuid: position.uuid, updates: body})

    }

    async getOrder(order: IOrderList): Promise<IOrder> {
        return this.apiService.doGetRequest(`/events/orders/${order.orderUuid}`)
    }

    async getOrdersByStatus(eventUuid: string, status: string): Promise<IOrderList[]> {
        return this.apiService.doGetRequest(`/events/${eventUuid}/orders/${status}`)
    }

    async getOrders(eventUuid: string): Promise<IOrderList[]> {
        return this.apiService.doGetRequest(`/events/${eventUuid}/orders`)
    }


    async getAllOrders(eventUuid: string): Promise<IOrderList[]> {

        let orders: IOrderList[] = await this.getOrdersByStatus(eventUuid, "preparation")
        let add: IOrderList[] = await this.getOrdersByStatus(eventUuid, "new")
        orders = orders.concat(add)
        add = await this.getOrdersByStatus(eventUuid, "completed")
        orders = orders.concat(add)

        if (!this.gotproducts) {
            await this.getProducts(eventUuid)
        }


        orders.forEach((order: IOrderList) => {
            order.tablename! = this.table[order.tableUuid]

            order.positions.forEach((position: IPositions) => {
                let uuid = position.productUuid

                position.name = this.map[uuid].name
                position.category = this.map[uuid].category
            });
        });

        return orders

    }

    async getWaiterOrders(eventUuid: string): Promise<IOrderList[]> {
        let orders: IOrderList[] = await this.getOrdersByStatus(eventUuid, "preparation")
        if (!this.gotproducts) {
            await this.getProducts(eventUuid)
        }

        orders.forEach((order: IOrderList) => {
            order.tablename! = this.table[order.tableUuid]

            order.positions.forEach((position: IPositions) => {
                let uuid = position.productUuid

                position.name = this.map[uuid].name
                position.category = this.map[uuid].category
            });
        });

        return orders

    }

    /*enum OrderStatus {
        NEW = 'new',
        PREPARATION = 'preparation',
        -------
        COMPLETED = 'completed'
      }
      
      enum OrderPositionStatus {
        WAITING = 'waiting',
        READY = 'ready',
        DELIVERED = 'delivered'
      }*/
    async getKitchenOrders(eventUuid: string): Promise<IOrderList[]> {
        let orders: IOrderList[] = await this.getOrdersByStatus(eventUuid, "new")
        let add: IOrderList[] = await this.getOrdersByStatus(eventUuid, "preparation")
        orders = orders.concat(add)

        if (!this.gotproducts) {
            await this.getProducts(eventUuid)
        }


        orders.forEach((order: IOrderList) => {
            order.tablename! = this.table[order.tableUuid]

            order.positions.forEach((position: IPositions) => {
                let uuid = position.productUuid

                position.name = this.map[uuid].name
                position.category = this.map[uuid].category
            });
        });


        return orders

    }

    async getTable(eventUuid: string) {
        let tables: ITable[] = (await this.tableService.getTables(eventUuid)).tableList

        tables.forEach((table: ITable) => {
            this.table[table.uuid] = table.tableNumber
        });
    }

    async getCategory() {
        let categories: ICategory[] = (await this.categoryService.getCategories()).categoryList

        categories.forEach((category: ICategory) => {
            this.category[category.uuid] = category.name
        });
    }


    async getProducts(eventUuid: string) {
        await this.getCategory();
        await this.getTable(eventUuid);
        let products: IProduct[] = (await this.productSevice.getProducts(eventUuid))
            .productList;
        products.forEach((product: IProduct) => {
            const uuid: string = product.uuid.toString();
            let puuid = product.categoryUuid!;
            let categoryname = this.category[puuid];
            this.map[uuid] = {name: product.name, category: categoryname};

        });
        this.gotproducts = true
    }


}
