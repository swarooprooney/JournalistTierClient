import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  userId: number = 0;
  user!: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private toaster: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')!)?.userId;
    this.getUser(this.userId);
    console.log(this.user);
  }

  saveChanges() {
    console.log(this.user);
    this.userService.updateUser(this.user).subscribe((response) => {
      this.toaster.success('Changes Saved Successfully');
    });
    this.editForm.reset(this.user);
  }

  getUser(id: number) {
    this.userService.getUser(id).subscribe((Response) => {
      this.user = <User>Response;
    });
  }
}
