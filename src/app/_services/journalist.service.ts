import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JournalistService {
  baseUrl = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) {}
  search(model: any) {
    return this.http.get(this.baseUrl + 'journalist/' + model.id);
  }
}
