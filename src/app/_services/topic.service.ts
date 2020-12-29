import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  baseUrl = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) {}

  private requestOptions = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  getTopics() {
    return this.http.get(this.baseUrl + 'topic');
  }

  addTopic(topic: any) {
    return this.http.post(this.baseUrl + 'topic/', JSON.stringify(topic.name), {
      headers: this.requestOptions,
    });
  }
}
