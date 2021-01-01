import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Journalist } from '../_models/journalist';

@Injectable({
  providedIn: 'root',
})
export class JournalistService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  searchJournalist(model: any) {
    return this.http.get<Journalist>(this.baseUrl + 'journalist/' + model.id);
  }

  getJournalist(id: number) {
    return this.http.get<Journalist>(this.baseUrl + 'journalist/' + id);
  }

  getJournalists() {
    return this.http.get<Journalist[]>(this.baseUrl + 'journalist/');
  }

  addJournalist(journalist: any) {
    return this.http.post(
      this.baseUrl + 'journalist/',
      JSON.stringify(journalist)
    );
  }
}
