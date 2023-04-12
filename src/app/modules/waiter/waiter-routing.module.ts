import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewOrderComponent } from "./new-order/new-order.component";
import { OrderviewComponent } from "./orderview/orderview.component";
import { CommonModule } from '@angular/common';
import { WaiterviewComponent } from "./waiterview/waiterview.component";


const routes: Routes = [
    {
      /* Hier ändern bei Bedarf */
      path: '',
      component: NewOrderComponent
    },
    {
      path: 'neworder',
      component: NewOrderComponent
    },
    {
      path: 'orderview',
      component: OrderviewComponent
    },
    {
      path: 'waiterview',
      component: WaiterviewComponent
    },
    {
      path: '**',
      redirectTo: ''
    }
  ];
  
  @NgModule({
    imports: [CommonModule,
      RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


  export class WaiterRoutingModule { }
