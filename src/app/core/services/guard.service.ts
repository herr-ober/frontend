import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('role')) {
            alert("Not allowed to view this page")
            this.router.navigate(['']);
            return false;
        }

        if (localStorage.getItem('token')) {
            return true;
        }

        alert("Not allowed to view this page")
        this.router.navigate(['']);
        return false;
    }
}

export class AuthGuardStaffWaiter implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //if (localStorage.getItem('role') == "waiter") {
            if (localStorage.getItem('token')) {
                return true;
            }
        //}

        alert("Not allowed to view this page")
        this.router.navigate(['']);
        return false;
    }
}

export class AuthGuardStaffKitchen implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //if (localStorage.getItem('role') == "kitchen") {
            if (localStorage.getItem('token')) {
                return true;
            }
        //}

        alert("Not allowed to view this page")
        this.router.navigate(['']);
        return false;
    }
}
