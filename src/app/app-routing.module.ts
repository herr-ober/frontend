import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './core/services/guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'organizer',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/organizer/organizer.module').then(m => m.OrganizerModule),
  },
  {
    path: 'waiter',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/waiter/waiter.module').then(m => m.WaiterModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
