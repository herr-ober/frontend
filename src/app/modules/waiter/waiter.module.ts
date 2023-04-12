import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderviewComponent } from './orderview/orderview.component';
import { WaiterRoutingModule } from './waiter-routing.module';
import { WaiterviewComponent } from './waiterview/waiterview.component';



@NgModule({
  declarations: [
    NewOrderComponent,
    OrderviewComponent,
    WaiterviewComponent
  ],
  imports:[CommonModule, 
    WaiterRoutingModule]
  
})
export class WaiterModule { }
