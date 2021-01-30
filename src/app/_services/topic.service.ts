import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Topic } from '../_models/topic';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getTopics() {
    return this.http.get<Topic[]>(this.baseUrl + 'topic');
  }

  addTopic(topic: any) {
    return this.http.post(this.baseUrl + 'topic/', JSON.stringify(topic));
  }
}
