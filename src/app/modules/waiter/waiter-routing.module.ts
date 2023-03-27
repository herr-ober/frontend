import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderviewComponent } from './orderview/orderview.component';



const routes: Routes = [
  {
    path: '',
    component: OrderviewComponent
  },
  {
    path: 'orderview',
    component: OrderviewComponent
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
export class WaiterRoutingModule { }


