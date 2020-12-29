import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TopicService } from 'src/app/_services/topic.service';

@Component({
  selector: 'app-topic-add',
  templateUrl: './topic-add.component.html',
  styleUrls: ['./topic-add.component.css'],
})
export class TopicAddComponent implements OnInit {
  model: any = {};

  constructor(
    private topicService: TopicService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  addTopic(): void {
    this.topicService.addTopic(this.model).subscribe((response) => {
      this.toastrService.success('Topic added Successfully');
    });
  }
}
