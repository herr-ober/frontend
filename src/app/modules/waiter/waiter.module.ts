import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NewOrderComponent} from './new-order/new-order.component';
import {OrderViewComponent} from './orderview/order-view.component';
import {WaiterRoutingModule} from './waiter-routing.module';
import {WaiterViewComponent} from './waiterview/waiter-view.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        NewOrderComponent,
        OrderViewComponent,
        WaiterViewComponent
    ],
    imports: [
        CommonModule,
        WaiterRoutingModule, 
        NgOptimizedImage,
        FormsModule
    ]

})
export class WaiterModule {
}
