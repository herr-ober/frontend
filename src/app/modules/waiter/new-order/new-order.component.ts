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


  ngOnInit() {
    this.reload();
  }


  async switchSelectedCategory(category: String) {
    console.log(category)
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