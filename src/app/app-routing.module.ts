import { OrganizerModule } from './modules/organizer/organizer.module';
import { WaiterModule } from './modules/waiter/waiter.module';
import { KitchenModule } from './modules/kitchen/kitchen.module';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'organizer',
    loadChildren: () => import('./modules/organizer/organizer.module').then(m => m.OrganizerModule)
  },
  {
    path: 'waiter',
    loadChildren: () => import('./modules/waiter/waiter.module').then(m => m.WaiterModule)
  },
  {
    path: 'kitchen',
    loadChildren: () => import('./modules/kitchen/kitchen.module').then(m => m.KitchenModule)
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
