import {NgModule} from '@angular/core';
import {AuthGuard} from './core/services/guard.service';
import {RouterModule, Routes} from "@angular/router";

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
        loadChildren: () => import('./modules/waiter/waiter.module').then(m => m.WaiterModule)
    },
    {
        canActivate: [AuthGuard],
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
