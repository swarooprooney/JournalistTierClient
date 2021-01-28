import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JournalistRating } from 'src/app/_models/journalistRating';
import { JournalistTierQuery } from 'src/app/_models/journalisttierquery';
import { JournalistService } from 'src/app/_services/journalist.service';
import { RatingService } from 'src/app/_services/rating.service';

@Component({
  selector: 'app-journalist-list',
  templateUrl: './journalist-list.component.html',
  styleUrls: ['./journalist-list.component.css'],
})
export class JournalistListComponent implements OnInit {
  journalists: any;
  journalistRating: JournalistTierQuery = {
    journalistId: -1,
    topicId: -1,
    mediaId: 0,
  };

  ratingArray: number[] = [];
  constructor(
    private journalistService: JournalistService,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.getJournalists();
  }

  getJournalists() {
    this.journalistService.getJournalists().subscribe((response) => {
      this.journalists = response;
      this.getJournalistsRating();
    });
  }

  getJournalistsRating() {
    for (let index = 0; index < this.journalists?.length; index++) {
      this.journalistRating.journalistId = +this.journalists[index]
        .journalistId;
      this.ratingService
        .getJournalistRating(this.journalistRating)
        .subscribe((response) => {
          this.journalists[index].rating = response;
        });
    }
    console.log(this.ratingArray);
  }
}
