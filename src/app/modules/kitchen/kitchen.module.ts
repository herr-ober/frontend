import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KitchenRoutingModule} from './kitchen-routing.module';
import {KitchenViewComponent} from './kitchenview/kitchen-view.component';

@NgModule({
    declarations: [
        KitchenViewComponent
    ],
    imports: [
        CommonModule,
        KitchenRoutingModule
    ]
})
export class KitchenModule {
}
