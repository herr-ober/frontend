import { OrganizerModule } from './modules/organizer/organizer.module';
import { WaiterModule } from './modules/waiter/waiter.module';
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
