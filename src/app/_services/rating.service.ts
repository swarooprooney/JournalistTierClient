import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RatingByTopic } from '../_models/ratingbytopic';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  rateJournalist(model: any) {
    console.log(model);
    return this.http.post(
      this.baseUrl + 'journalist/RateJournalist',
      JSON.stringify(model)
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

  getJournalistRatingByTopic(journalistId: number) {
    let params = new HttpParams();
    params = params.append('journalistId', journalistId.toString());
    return this.http.get<RatingByTopic[]>(
      this.baseUrl + 'journalist/GetJournalistRatingByTopic',
      {
        params: params,
      }
    );
  }
}
