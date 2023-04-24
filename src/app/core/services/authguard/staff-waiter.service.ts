import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({providedIn: 'root'})

export class AuthGuardStaffWaiter {

    constructor(private router: Router) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('role') == "waiter") {
            if (localStorage.getItem('token')) {
                return true;
            }
        }

        alert("Not allowed to view this page")
        await this.router.navigate(["/auth/login/staff"]);
        return false;
    }
}