import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/_services/media.service';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css'],
})
export class MediaListComponent implements OnInit {
  medias: any;
  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.getMedias();
  }

  getMedias() {
    this.mediaService.getMedias().subscribe((response) => {
      this.medias = response;
    });
  }
}
