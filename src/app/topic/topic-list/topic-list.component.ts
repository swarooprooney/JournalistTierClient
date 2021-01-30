import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from 'src/app/_models/topic';
import { TopicService } from 'src/app/_services/topic.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css'],
})
export class TopicListComponent implements OnInit {
  topics: any;
  topics$!: Observable<Topic[]>;
  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics() {
    this.topics$ = this.topicService.getTopics();
  }
}
