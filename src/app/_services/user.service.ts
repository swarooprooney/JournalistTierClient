import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  updateUser(user: any) {
    return this.http.put(
      this.baseUrl + 'account/updateuser',
      JSON.stringify(user)
    );
  }

  getUser(id: number) {
    return this.http.get<User>(this.baseUrl + 'account/' + id);
  }
}
