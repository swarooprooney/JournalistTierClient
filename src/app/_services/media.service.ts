import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.apiUrl;
  getMedias() {
    return this.http.get(this.baseUrl + 'media');
  }
}
