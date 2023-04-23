import {NgModule} from '@angular/core';
import {AuthGuardOrganizer} from './core/services/authguard/organizer.service';
import {AuthGuardStaffWaiter} from './core/services/authguard/staff-waiter.service';
import {AuthGuardStaffKitchen} from './core/services/authguard/staff-kitchen.service';
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
        canActivate: [AuthGuardOrganizer],
        loadChildren: () => import('./modules/organizer/organizer.module').then(m => m.OrganizerModule),
    },
    {
        path: 'waiter',
        canActivate: [AuthGuardStaffWaiter],
        loadChildren: () => import('./modules/waiter/waiter.module').then(m => m.WaiterModule)
    },
    {
        canActivate: [AuthGuardStaffKitchen],
        path: 'kitchen',
        loadChildren: () => import('./modules/kitchen/kitchen.module').then(m => m.KitchenModule)
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'auth'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
