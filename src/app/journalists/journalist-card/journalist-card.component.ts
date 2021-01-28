import { Component, Input, OnInit } from '@angular/core';
import { Journalist } from 'src/app/_models/journalist';

@Component({
  selector: 'app-journalist-card',
  templateUrl: './journalist-card.component.html',
  styleUrls: ['./journalist-card.component.css'],
})
export class JournalistCardComponent implements OnInit {
  @Input() journalist!: Journalist;

  constructor() {}

  ngOnInit(): void {}
}
