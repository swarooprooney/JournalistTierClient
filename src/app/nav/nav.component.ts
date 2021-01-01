import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../_services/authentication.service';
import { JournalistService } from '../_services/journalist.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public authenticationService: AuthenticationService,
    private journalistService: JournalistService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.authenticationService.currentUser$);
  }

  login(): void {
    this.authenticationService.login(this.model).subscribe((response) => {
      this.toastr.success('Welcome');
      this.router.navigateByUrl('/journalists');
    });
  }

  logout(): void {
    this.authenticationService.logout();
    this.toastr.success('Logged out successfully');
    this.router.navigateByUrl('/');
  }

  search(): void {
    this.journalistService.searchJournalist(this.model).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
