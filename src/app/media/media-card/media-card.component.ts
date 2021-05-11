import { Component, Input, OnInit } from '@angular/core';
import { Media } from 'src/app/_models/media';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.css'],
})
export class MediaCardComponent implements OnInit {
  @Input() media!: Media;
  constructor() {}

  ngOnInit(): void {}
}
