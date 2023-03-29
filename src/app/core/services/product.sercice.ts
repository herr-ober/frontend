import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProduct } from "src/app/models/IProduct";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
  
    constructor(private apiService: ApiService) { }
  
  
    async addNewProduct(body: IProduct): Promise<void> {
      return this.apiService.doPostRequest('/exercises', body);
    }
  
    private async getAllProducts(): Promise<IProduct[]> {
      return await this.apiService.doGetRequest('/exercises');
    }
  
  
    async getAllProductsAsMap() {
      let result: Map<string, IProduct> = new Map();
  
      await this.getAllProducts().then(res => {
        result = new Map(
          res.map(object => {
            return [object.name, object];
          }),
        )
      }).catch((res: HttpErrorResponse) => {
        console.log(res)
      })
      return result;
    }
  
  
    async deleteProductById(id: string): Promise<void> {
      return this.apiService.doDeleteRequest('/exercises/' + id, {}).then(() => {
      }).catch((res: HttpErrorResponse) => {
        console.log(res)
      })
    }
  }