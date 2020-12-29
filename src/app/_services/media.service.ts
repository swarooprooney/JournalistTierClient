import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:5000/api/';
  getMedias() {
    return this.http.get(this.baseUrl + 'media');
  }
}
