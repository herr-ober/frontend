import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({providedIn: 'root'})

export class AuthGuardOrganizer {

    constructor(private router: Router) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('role') == "organizer") {
            if (localStorage.getItem('token')) {
                return true;
            }
        }
    
        alert("Not allowed to view this page")
        await this.router.navigate(["/auth/login/organizer"]);
        return false;
    }
}