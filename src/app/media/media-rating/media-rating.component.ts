import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Media } from 'src/app/_models/media';
import { MediaRating } from 'src/app/_models/MediaRating';
import { Topic } from 'src/app/_models/topic';
import { MediaService } from 'src/app/_services/media.service';
import { RatingService } from 'src/app/_services/rating.service';
import { TopicService } from 'src/app/_services/topic.service';

@Component({
  selector: 'app-media-rating',
  templateUrl: './media-rating.component.html',
  styleUrls: ['./media-rating.component.css'],
})
export class MediaRatingComponent implements OnInit {
  medias$!: Observable<Media[]>;
  topics$!: Observable<Topic[]>;
  max: number = 5;
  validationErrors: string[] = [];
  isReadonly: boolean = false;
  mediaRating: MediaRating = {
    mediaId: -1,
    topicId: -1,
    userId: 0,
    rating: 0,
  };
  constructor(
    private mediaService: MediaService,
    private topicService: TopicService,
    private ratingService: RatingService,
    private toastrService: ToastrService
  ) {}

  defaultMedia: Media = {
    mediaId: -1,
    name: 'Please select a media',
    description: 'Select media',
    photoUrl: '',
  };

  ngOnInit(): void {
    this.getAllMedia();
    this.getAllTopics();
  }

  getAllMedia() {
    this.medias$ = this.mediaService
      .getMedias()
      .pipe(tap((x) => x.unshift(this.defaultMedia)));
  }

  getAllTopics() {
    this.topics$ = this.topicService.getTopics();
  }
  rateJournalist() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.mediaRating.userId = +user.userId;
    this.ratingService.rateMedia(this.mediaRating).subscribe(
      () => {
        this.toastrService.success('Your rating has been captured');
        this.validationErrors = [];
        this.mediaRating = {
          mediaId: -1,
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
