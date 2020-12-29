import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  baseUrl = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) {}

  private requestOptions = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  rateJournalist(model: any) {
    console.log(model);
    return this.http.post(
      this.baseUrl + 'journalist/RateJournalist',
      JSON.stringify(model),
      {
        headers: this.requestOptions,
      }
    );
  }

  getJournalistRating(model: any) {
    console.log(model);
    let params = new HttpParams();
    params = params.append('journalistId', model.journalistId);
    params = params.append('topicId', model.topicId);
    params = params.append('mediaId', model.mediaId);
    return this.http.get(this.baseUrl + 'journalist/GetJournalistTier', {
      params: params,
    });
  }
}
