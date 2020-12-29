import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Journalist } from 'src/app/_models/journalist';
import { JournalistService } from 'src/app/_services/journalist.service';

@Component({
  selector: 'app-journalist-add',
  templateUrl: './journalist-add.component.html',
  styleUrls: ['./journalist-add.component.css'],
})
export class JournalistAddComponent implements OnInit {
  constructor(
    private journalistService: JournalistService,
    private toastrService: ToastrService
  ) {}
  model: any = {};
  ngOnInit(): void {}

  addJournalist() {
    console.log(this.model);
    this.journalistService.addJournalist(this.model).subscribe((response) => {
      console.log(response);
      this.toastrService.success('Journalist added');
    });
  }
}
