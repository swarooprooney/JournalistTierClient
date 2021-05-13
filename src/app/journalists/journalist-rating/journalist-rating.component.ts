import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JournalistRating } from 'src/app/_models/journalistRating';
import { Journalist } from 'src/app/_models/journalist';
import { JournalistService } from 'src/app/_services/journalist.service';
import { RatingService } from 'src/app/_services/rating.service';
import { TopicService } from 'src/app/_services/topic.service';
import { Topic } from 'src/app/_models/topic';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-journalist-rating',
  templateUrl: './journalist-rating.component.html',
  styleUrls: ['./journalist-rating.component.css'],
})
export class JournalistRatingComponent implements OnInit {
  journalists$!: Observable<Journalist[]>;
  topics$!: Observable<Topic[]>;
  max: number = 5;
  isReadonly: boolean = false;
  journalistRating: JournalistRating = {
    journalistId: -1,
    topicId: -1,
    userId: 0,
    rating: 0,
  };
  journalistDefault: Journalist = {
    journalistId: -1,
    name: 'Please select a value',
    photoUrl: '',
    description: '',
    rating: {
      rating: 0,
      numberOfVotes: 0,
    },
  };
  validationErrors: string[] = [];
  constructor(
    private journalistService: JournalistService,
    private topicService: TopicService,
    private ratingService: RatingService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.journalists$ = this.journalistService.getJournalists().pipe(
      map((x) => {
        x.unshift(this.journalistDefault);
        return x;
      })
    );
    this.selectJournalist();
    this.topics$ = this.topicService.getTopics();
  }
  selectJournalist() {
    var id = +this.route.snapshot.paramMap.get('id')!;
    if (id != 0) {
      this.journalistRating.journalistId = id;
    } else {
      this.journalistRating.journalistId = -1;
    }
  }

  rateJournalist() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.journalistRating.userId = +user.userId;
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

  validateForm(): boolean {
    if (
      this.journalistRating.topicId <= 0 ||
      this.journalistRating.journalistId <= 0 ||
      this.journalistRating.rating <= 0
    ) {
      return true;
    }
    return false;
  }
}
