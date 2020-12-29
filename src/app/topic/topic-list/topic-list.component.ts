import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/_services/topic.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css'],
})
export class TopicListComponent implements OnInit {
  topics: any;
  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics() {
    this.topicService.getTopics().subscribe((response) => {
      this.topics = response;
    });
  }
}
