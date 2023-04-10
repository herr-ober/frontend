import {EventService} from '../../../core/services/event.service';
import {Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormControl} from "@angular/forms";
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from 'src/app/core/services/product.service';
import { IEvent } from 'src/app/models/IEvent';
import { ICategory } from 'src/app/models/ICategory';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html'
})


export class AddProductsComponent implements OnInit {

  constructor(private productService: ProductService, private eventService: EventService, private categoryService: CategoryService) { }

  currentEvent: IEvent = {uuid: "", organizerUuid: "", name: "", location: "", date: new Date() };
  
  productCategories: ICategory[] = [];
  productsFromCategories: Map<string, IProduct[]> = new Map([
    ["", []],
  ])
  
  addProductFormGroup = new FormGroup({
    name: new FormControl<string | null>(null, {validators: [Validators.required]}),
    price: new FormControl<number | null>(null, {validators: [Validators.required]}),
    category: new FormControl<string | null>(null, {validators: [Validators.required]})
  });

  async ngOnInit() {
    await this.reload();
  }

  async addProduct() {
    await this.productService.addProduct(this.currentEvent, this.addProductFormGroup.controls.name.value!,this.addProductFormGroup.controls.category.value!, this.addProductFormGroup.controls.price.value!)
    await this.reload();
    this.addProductFormGroup.controls.name.setValue(null);
    this.addProductFormGroup.controls.price.setValue(null);
    this.addProductFormGroup.controls.category.setValue(null);
  }

  async deleteProduct(productUuid: string) {
    await this.productService.deleteProduct(productUuid);
    await this.reload();
  }

  async reload() {
    this.currentEvent = await this.eventService.getEvent();
    this.productCategories = (await this.categoryService.getCategories()).categoryList;
    this.productsFromCategories.delete("");
    this.productCategories.forEach(async category => {
        this.productsFromCategories.set(category.name, (await this.productService.getProductsByCategory(this.currentEvent, category.uuid)).productList)
    });
    console.log(this.productsFromCategories);
    
  }
}
