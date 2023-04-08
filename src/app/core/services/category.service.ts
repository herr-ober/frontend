import { ICategory } from 'src/app/models/ICategory';
import { ApiService } from './api.service';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    constructor(private apiService: ApiService) { }

    async getCategories(): Promise< { categoryList: ICategory[] } > {
        return this.apiService.doGetRequest('/events/products/categories')
    }
}