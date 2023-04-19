import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {KitchenViewComponent} from './kitchenview/kitchen-view.component';

const routes: Routes = [
    {
        path: '',
        component: KitchenViewComponent
    },
    {
        path: 'kitchenview',
        component: KitchenViewComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]

})
export class KitchenRoutingModule {
}
