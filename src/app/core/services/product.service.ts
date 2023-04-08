import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {IEvent} from "../../models/IEvent";
import {HttpClient} from "@angular/common/http";
import { IProduct } from "src/app/models/IProduct";

@Injectable({providedIn: 'root'})
export class ProductService {

    constructor(private apiService: ApiService, private httpClient: HttpClient) {}

    /* async getCategories(): Promise<{categoryList: ICategories[]}> {
        await this.apiService.doGetRequest(`/events/products/categories`)
    } */
    async addNewProduct(event: IEvent, name: string, category: string, price: number) {
        await this.apiService.doPostRequest<void>(`/events/${event.uuid}/products`, {name: name, price: price, category: category})
    }
    async deleteProduct(event: IEvent, uuid: string) {
        await this.apiService.doDeleteRequest<void>(`/events/${event.uuid}/products`, {uuid: uuid})
    }
    async getProducts(event: IEvent): Promise<{productList: IProduct[]}>{
        return this.apiService.doGetRequest(`/events/${event.uuid}/products`)
    }
    async getProductsByCategory(event: IEvent, uuid: string): Promise<{productList: IProduct[]}>{
        return this.apiService.doGetRequest(`/events/${event.uuid}/products?category=${uuid}`)
    }
    
}