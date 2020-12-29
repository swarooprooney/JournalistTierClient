import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Journalist } from '../_models/journalist';

@Injectable({
  providedIn: 'root',
})
export class JournalistService {
  baseUrl = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) {}

  private requestOptions = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  search(model: any) {
    return this.http.get(this.baseUrl + 'journalist/' + model.id);
  }

  getJournalists() {
    return this.http.get<Journalist[]>(this.baseUrl + 'journalist/');
  }

  addJournalist(journalist: any) {
    return this.http.post(
      this.baseUrl + 'journalist/',
      JSON.stringify(journalist.name),
      {
        headers: this.requestOptions,
      }
    );
  }
}
