import { CategoryService } from './../../../core/services/category.service';
import { ICategory } from './../../../models/ICategory';
import { IEvent } from 'src/app/models/IEvent';
import { EventService } from './../../../core/services/event.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IProduct } from 'src/app/models/IProduct';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})

export class NewOrderComponent implements OnInit {

  constructor (private eventService: EventService, private categoryService: CategoryService) {}


  currentEvent: IEvent =  { uuid: "", organizerUuid: "", name: "", location: "", date: new Date() };
  eventCategories: ICategory[] = []
  productsFromCategory: IProduct[] = []

  temp: number = 5;

  ngOnInit() {
    this.reload();
  }


  async switchSelectedCategory(category: String) {
    console.log(category)

    if (category == "8041cbd6-e1c1-4d85-91fc-d8cc9c3456b2") {
      this.productsFromCategory = [ 
        { name: "Cola", price: 3, category: "8041cbd6-e1c1-4d85-91fc-d8cc9c3456b2"},
        { name: "Fanta", price: 3, category: "8041cbd6-e1c1-4d85-91fc-d8cc9c3456b2"},
        { name: "Spezi", price: 3, category: "8041cbd6-e1c1-4d85-91fc-d8cc9c3456b2"},
        { name: "Wasser", price: 4, category: "8041cbd6-e1c1-4d85-91fc-d8cc9c3456b2"},
        { name: "Apfelschorle", price: 2, category: "8041cbd6-e1c1-4d85-91fc-d8cc9c3456b2"},
        { name: "Seltzer", price: 6, category: "8041cbd6-e1c1-4d85-91fc-d8cc9c3456b2"},
        { name: "Kirschsaft", price: 10, category: "8041cbd6-e1c1-4d85-91fc-d8cc9c3456b2"}
      ]
    }

    else if (category == "066998d3-4305-4d02-a26f-93788f736956") {
      this.productsFromCategory = [ 
        { name: "Cäsar Salat", price: 3, category: "93788f736956"},
        { name: "Kleine Pommes", price: 3, category: "93788f736956"},
        { name: "Tomate", price: 3, category: "93788f736956"}
      ]
    } else {
      this.productsFromCategory = []
    }
  }


  getAmountOfProductInNewOrder(uuid: string): number {
    return this.temp;
  }

  decrementProductInNewOrder(uuid: string): void {
    if (this.temp > 0) {
      this.temp --;
    }
  }

  incrementProductInNewOrder(uuid: string): void {
    this.temp ++;
  }



  private async reload() {
    await this.eventService.getEvent()
    .then(res => {
      this.currentEvent = res
    })
    .catch((err: HttpErrorResponse) => {})

    await this.categoryService.getCategories()
    .then(res => {
      this.eventCategories = res.categoryList
    })
    .catch((err: HttpErrorResponse) => {})
    }
}