import { tap } from 'rxjs/operators';
import { isLoggedIn } from './auth.selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AppState } from '../reducers';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>,
        private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        :Observable<boolean> {
            return this.store
            .pipe(
                select(isLoggedIn),
                tap(loggedIn => {
                    if(!loggedIn){
                        this.router.navigateByUrl('/login');
                    }
                })
            )
        }

}