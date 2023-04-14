import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitchenRoutingModule } from './kitchen-routing.module';
import { KitchenviewComponent } from './kitchenview/kitchenview.component';

@NgModule({
  declarations: [
    KitchenviewComponent
  ],
  imports: [
    CommonModule,
    KitchenRoutingModule
  ]
})
export class KitchenModule { }
