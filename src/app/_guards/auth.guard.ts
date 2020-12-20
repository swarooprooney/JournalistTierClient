import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {}
  canActivate(): Observable<boolean> {
    return this.authenticationService.currentUser$.pipe(
      map((user) => {
        if (user) {
          return true;
        }
        this.toastr.error('Not authorised to access this page');
        return false;
      })
    );
  }
}
