import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { IEvent } from "src/app/models/IEvent"
import { ApiService } from "./api.service"
import { IProduct } from "src/app/models/IProduct"

@Injectable({providedIn: 'root'})
export class ProductService {

    constructor(private apiService: ApiService, private httpClient: HttpClient) {}

    async addProduct(event: IEvent, name: string, category: string, price: number) {
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