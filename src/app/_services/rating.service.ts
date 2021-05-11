import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Media } from '../_models/media';
import { MediaRating } from '../_models/MediaRating';
import { RatingByTopic } from '../_models/ratingbytopic';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  rateJournalist(model: any) {
    return this.http.post(
      this.baseUrl + 'journalist/RateJournalist',
      JSON.stringify(model)
    );
  }

  rateMedia(mediaRating: MediaRating) {
    console.log(mediaRating);
    return this.http.post(
      this.baseUrl + 'media/RateMedia',
      JSON.stringify(mediaRating)
    );
  }

  getJournalistRating(model: any) {
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
