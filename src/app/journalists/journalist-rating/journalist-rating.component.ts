import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JournalistRating } from 'src/app/_models/journalistRating';
import { JournalistService } from 'src/app/_services/journalist.service';
import { RatingService } from 'src/app/_services/rating.service';
import { TopicService } from 'src/app/_services/topic.service';
@Component({
  selector: 'app-journalist-rating',
  templateUrl: './journalist-rating.component.html',
  styleUrls: ['./journalist-rating.component.css'],
})
export class JournalistRatingComponent implements OnInit {
  journalists: any;
  topics: any;
  max: number = 5;
  rate: number = 0;
  isReadonly: boolean = false;
  journalistRating: JournalistRating = {
    journalistId: -1,
    topicId: -1,
    userId: 0,
    rating: 0,
  };
  validationErrors: string[] = [];
  constructor(
    private journalistService: JournalistService,
    private topicService: TopicService,
    private ratingService: RatingService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.rate = 0;
    this.journalistService.getJournalists().subscribe((response) => {
      this.journalists = response;
    });
    this.topicService.getTopics().subscribe((response) => {
      this.topics = response;
    });
  }
  rateJournalist(form: NgForm) {
    this.journalistRating.rating = this.rate;
    const user = JSON.parse(localStorage.getItem('user')!);
    this.journalistRating.userId = +user.userId;
    this.journalistRating.journalistId = +this.journalistRating.journalistId;
    this.journalistRating.topicId = +this.journalistRating.topicId;
    this.ratingService.rateJournalist(this.journalistRating).subscribe(
      () => {
        this.toastrService.success('Your rating has been captured');
        this.validationErrors = [];
        this.journalistRating = {
          journalistId: -1,
          topicId: -1,
          userId: 0,
          rating: 0,
        };
      },
      (error) => {
        console.log(error);
        this.validationErrors = error;
      }
    );
  }
}
