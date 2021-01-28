import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../_models/registeruser';
import { User } from '../_models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}
  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.authenticationService.currentUserSource.next(user);
        }
        return user;
      })
    );
  }
}
