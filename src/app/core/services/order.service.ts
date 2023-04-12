import { ICreateNewOrder, IOrderList, IPositions, IMap, IOrder, IPositionStatus, IPatchOrder } from 'src/app/models/IOrder';
import {ICreateEvent, IEvent, IUpdateEvent} from '../../models/IEvent';
import {ITable, ITableMap} from '../../models/ITable';
import {IProduct} from '../../models/IProduct';
import {ApiService} from "./api.service";
import {Injectable} from '@angular/core';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { TableService } from './table.service';
import { ICategory, ICategoryMap } from 'src/app/models/ICategory';


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

    async postOrder(body: ICreateNewOrder, event: IEvent): Promise< { orderUuid: string } > {
        return this.apiService.doPostRequest(`/events/${event.uuid}/orders`, body )
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

    async patchOrderBuildBody(body: IPatchOrder, order: IOrderList): Promise<IPatchOrder>{
        return this.apiService.doPatchRequest(`/events/orders`, {uuid: order.orderUuid, updates: body })

    }
    async patchPosition(body: IPositionStatus, position: IPositions): Promise<IPositionStatus>{
        return this.apiService.doPatchRequest(`/events/orders/positions`, {uuid: position.uuid, updates: body } )

    }
    async getOrder(order: IOrderList): Promise<IOrder> {
        return this.apiService.doGetRequest(`/events/orders/${order.orderUuid}`)
    }
    async getOrdersByStatus(event: IEvent, status: string): Promise<IOrderList[]> {
        return this.apiService.doGetRequest(`/events/${event.uuid}/orders/${status}`)
    }
    async getOrders(event: IEvent): Promise<IOrderList[]> {
        return this.apiService.doGetRequest(`/events/${event.uuid}/orders`)
    }

    

    async getAllOrders(event: IEvent): Promise<IOrderList[]>{
        
        let orders: IOrderList[] = await this.getOrdersByStatus(event, "preparation")
        let add : IOrderList[] = await this.getOrdersByStatus(event, "new")
        orders = orders.concat(add)
        add = await this.getOrdersByStatus(event, "completed")
        orders = orders.concat(add)

        if(!this.gotproducts){
            await this.getProducts(event)
        }
        
        

        orders.forEach( (order: IOrderList) => {
            order.tablename! = this.table[order.tableUuid]

            order.positions.forEach( (position: IPositions) => {
                let uuid = position.productUuid
                
                position.name = this.map[uuid].name
                position.category = this.map[uuid].category
            });
        });

        return orders

    }
    async getWaiterOrders(event: IEvent): Promise<IOrderList[]>{
        let orders: IOrderList[] = await this.getOrdersByStatus(event, "preparation")

        if(!this.gotproducts){
            await this.getProducts(event)
        }

        orders.forEach( (order: IOrderList) => {
            order.tablename! = this.table[order.tableUuid]

            order.positions.forEach( (position: IPositions) => {
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
    async getKitchenOrders(event: IEvent): Promise<IOrderList[]>{
        let orders: IOrderList[] = await this.getOrdersByStatus(event, "new")
        let add : IOrderList[] = await this.getOrdersByStatus(event, "preparation")
        orders = orders.concat(add)

        if(!this.gotproducts){
            await this.getProducts(event)
        }


        orders.forEach( (order: IOrderList) => {
            order.tablename! = this.table[order.tableUuid]

            order.positions.forEach( (position: IPositions) => {
                let uuid = position.productUuid
                
                position.name = this.map[uuid].name
                position.category = this.map[uuid].category
            });
        });


        return orders

    }

    async getTable(event: IEvent){
        let tables: ITable[] = (await this.tableService.getTables(event)).tableList
        
        tables.forEach( (table: ITable) => {
            this.table[table.uuid] = table.tableNumber
        });
    }
    async getCategory(){
        let categories: ICategory[] = (await this.categoryService.getCategories()).categoryList
        
        categories.forEach( (category: ICategory) => {
            this.category[category.uuid] = category.name
        });
    }

    

    
    async getProducts(event: IEvent) {
        await this.getCategory();
        await this.getTable(event);
        let products: IProduct[] = (await this.productSevice.getProducts(event))
        .productList;
        products.forEach((product: IProduct) => {
            const uuid: string = product.uuid.toString();
            let puuid = product.categoryUuid!;
            let categoryname = this.category[puuid];
            this.map[uuid] = { name: product.name, category: categoryname};
            
        });
        this.gotproducts = true
    }
      
    
}