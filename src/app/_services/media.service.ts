import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Media } from '../_models/media';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.apiUrl;
  getMedias() {
    return this.http.get<Media[]>(this.baseUrl + 'media');
  }

  addMedia(media: Media) {
    console.log(media);
    return this.http.post(this.baseUrl + 'media/', JSON.stringify(media));
  }
}
