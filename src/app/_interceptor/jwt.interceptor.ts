import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let currentUser!: User;
    this.authenticationService.currentUser$
      .pipe(take(1))
      .subscribe((response) => {
        currentUser = response;
      });
    if (currentUser) {
      console.log(currentUser);
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + currentUser.token,
          'Content-Type': 'application/json',
        },
      });
    }
    return next.handle(request);
  }
}
