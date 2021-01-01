import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Journalist } from 'src/app/_models/journalist';
import { JournalistService } from 'src/app/_services/journalist.service';

@Component({
  selector: 'app-journalist-detail',
  templateUrl: './journalist-detail.component.html',
  styleUrls: ['./journalist-detail.component.css'],
})
export class JournalistDetailComponent implements OnInit {
  journalist!: Journalist;
  constructor(
    private journalistService: JournalistService,
    private route: ActivatedRoute
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
      });
  }
}
