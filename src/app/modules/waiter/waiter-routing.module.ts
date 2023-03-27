import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewOrderComponent } from "./new-order/new-order.component";


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
      path: '**',
      redirectTo: ''
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


  export class WaiterRoutingModule { }
