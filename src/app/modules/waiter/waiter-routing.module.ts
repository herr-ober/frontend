import {NgModule} from "@angular/core";
import {NewOrderComponent} from "./new-order/new-order.component";
import {OrderViewComponent} from "./orderview/order-view.component";
import {CommonModule} from '@angular/common';
import {WaiterViewComponent} from "./waiterview/waiter-view.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {
        path: '',
        component: WaiterViewComponent
    },
    {
        path: 'neworder',
        component: NewOrderComponent
    },
    {
        path: 'orderview',
        component: OrderViewComponent
    },
    {
        path: 'waiterview',
        component: WaiterViewComponent
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
export class WaiterRoutingModule {
}
