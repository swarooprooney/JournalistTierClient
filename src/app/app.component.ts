import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  journalists: any;
  title = 'The Journalist Rating App';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getJournalists();
  }

  getJournalists(): void {
    this.http
      .get('https://journalisttier.azurewebsites.net/api/journalist/')
      .subscribe(
        (response) => {
          this.journalists = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
