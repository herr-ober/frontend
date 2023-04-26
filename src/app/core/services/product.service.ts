import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {IEvent} from "../../shared/models/IEvent";
import {IProduct} from "src/app/shared/models/IProduct";

@Injectable({providedIn: 'root'})
export class ProductService {

    constructor(private apiService: ApiService) {
    }

    async addProduct(eventUuid: string, name: string, categoryUuid: string, price: number) {
        await this.apiService.doPostRequest<void>(`/events/${eventUuid}/products`, {
            name: name,
            price: price,
            categoryUuid: categoryUuid
        })
    }

    async deleteProduct(productUuid: string) {
        await this.apiService.doDeleteRequest<void>(`/events/products`, {uuid: productUuid})
    }

    async getProducts(eventUuid: string): Promise<{ productList: IProduct[] }> {
        return this.apiService.doGetRequest(`/events/${eventUuid}/products`)
    }

    async getProductsByCategory(event: IEvent, uuid: string): Promise<{ productList: IProduct[] }> {
        return this.apiService.doGetRequest(`/events/${event.uuid}/products?category=${uuid}`)
    }
}
