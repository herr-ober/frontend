import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderviewComponent } from './orderview/orderview.component';
import { WaiterRoutingModule } from './waiter-routing.module';



@NgModule({
  declarations: [
    OrderviewComponent
  ],
  imports: [
    CommonModule,
    WaiterRoutingModule
  ]
})
export class WaiterModule { }
