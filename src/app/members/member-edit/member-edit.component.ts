import { identifierModuleUrl } from '@angular/compiler';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user';
import { BusyService } from 'src/app/_services/busy.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  userId: number = 0;
  user!: User;
  uploader!: FileUploader;
  baseUrl = environment.apiUrl;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private toaster: ToastrService,
    private userService: UserService,
    private busyService: BusyService
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')!)?.userId;
    this.getUser(this.userId);
    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'account/add-photo',
      authToken: 'Bearer ' + JSON.parse(localStorage.getItem('user')!)?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onProgressItem = (item, progress) => {
      this.busyService.busy();
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        this.user.photoUrl = response;
        this.updateUser();
        this.busyService.idle();
      }
    };
    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.toaster.error('Unable to upload photo');
      this.toaster.info('Other details will be updated');
      this.updateUser();
      this.busyService.idle();
    };
  }

  saveChanges() {
    if (this.uploader.queue.length > 0) {
      let item = this.uploader.queue[0];
      item.upload();
      this.toaster.info('Photo change might take sometime to reflect');
    } else {
      this.updateUser();
    }
    this.editForm.reset(this.user);
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe((response) => {
      this.toaster.success('Changes Saved Successfully');
    });
  }

  getUser(id: number) {
    this.userService.getUser(id).subscribe((Response) => {
      this.user = <User>Response;
    });
  }
}
