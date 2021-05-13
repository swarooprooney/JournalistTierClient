import { Component, OnInit } from '@angular/core';
import { Media } from 'src/app/_models/media';
import { Rating } from 'src/app/_models/rating';
import { TierQuery } from 'src/app/_models/tierQuery';
import { MediaService } from 'src/app/_services/media.service';
import { RatingService } from 'src/app/_services/rating.service';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css'],
})
export class MediaListComponent implements OnInit {
  medias!: Media[];
  tierQuery: TierQuery = {
    journalistId: -1,
    topicId: -1,
    mediaId: -1,
  };
  constructor(
    private mediaService: MediaService,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.getMedias();
  }

  getMedias() {
    this.mediaService.getMedias().subscribe((response) => {
      this.medias = response;

      this.getMediaRatings();
    });
  }

  getMediaRatings() {
    for (let index = 0; index < this.medias?.length; index++) {
      this.tierQuery.mediaId = +this.medias[index].mediaId;
      this.ratingService
        .getMediaRating(this.tierQuery)
        .subscribe((response) => {
          this.medias[index].rating = response as Rating;
        });
    }
  }
}
