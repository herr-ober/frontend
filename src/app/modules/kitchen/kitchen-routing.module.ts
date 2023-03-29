import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { KitchenviewComponent } from './kitchenview/kitchenview.component';

const routes: Routes = [
  {
    path: '',
    component: KitchenviewComponent
  },
  {
    path: 'kitchenview',
    component: KitchenviewComponent
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
export class KitchenRoutingModule { }