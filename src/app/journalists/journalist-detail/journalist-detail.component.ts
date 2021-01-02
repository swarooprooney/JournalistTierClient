import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Journalist } from 'src/app/_models/journalist';
import { JournalistTierQuery } from 'src/app/_models/journalisttierquery';
import { JournalistService } from 'src/app/_services/journalist.service';
import { RatingService } from 'src/app/_services/rating.service';

@Component({
  selector: 'app-journalist-detail',
  templateUrl: './journalist-detail.component.html',
  styleUrls: ['./journalist-detail.component.css'],
})
export class JournalistDetailComponent implements OnInit {
  journalist!: Journalist;
  journalistRating: JournalistTierQuery = {
    journalistId: -1,
    topicId: -1,
    mediaId: 0,
  };
  constructor(
    private journalistService: JournalistService,
    private route: ActivatedRoute,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.loadJournalist();
  }

  loadJournalist() {
    this.journalistService
      .getJournalist(+this.route.snapshot.paramMap.get('id')!)
      .subscribe((journalist) => {
        console.log(journalist);
        this.journalist = journalist;
        this.getRating();
      });
  }

  getRating() {
    this.journalistRating.journalistId = this.journalist.journalistId;
    this.ratingService
      .getJournalistRating(this.journalistRating)
      .subscribe((response) => {
        this.journalist.rating = +response;
      });
  }
}
