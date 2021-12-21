import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {map, take} from "rxjs/operators";
import { DataService } from '../services/data.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(
        private dataService: DataService,
        private router: Router
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log('calling can activate')
        return this.dataService.userBehaviorSubject.pipe(
            take(1),
            map((user) => {
                const isLogged = !!user;
                if (isLogged) {
                    console.log('can activate is true')
                    return true;
                }
                else return this.router.createUrlTree(['auth']);
            }))
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(childRoute, state);
    }
}
