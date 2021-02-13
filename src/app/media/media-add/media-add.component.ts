import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { Media } from 'src/app/_models/media';
import { BusyService } from 'src/app/_services/busy.service';
import { MediaService } from 'src/app/_services/media.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-media-add',
  templateUrl: './media-add.component.html',
  styleUrls: ['./media-add.component.css'],
})
export class MediaAddComponent implements OnInit {
  mediaAddForm!: FormGroup;
  uploader!: FileUploader;
  baseUrl = environment.apiUrl;
  media!: Media;
  photoUrl!: string;
  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private busyService: BusyService,
    private mediaService: MediaService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeUploader();
  }

  initializeForm() {
    this.mediaAddForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
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
      if (this.uploader.queue.length > 1) {
        this.uploader.queue[0].remove();
      }
      file.withCredentials = false;
    };
    this.uploader.onProgressItem = (item, progress) => {
      this.busyService.busy();
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        this.photoUrl = response;
        this.addmedia();
        this.busyService.idle();
        this.mediaAddForm.reset();
      }
    };
  }

  addmedia() {
    this.media = this.mediaAddForm.value;
    this.media.photoUrl = this.photoUrl;
    this.mediaService.addMedia(this.media).subscribe((response) => {
      this.toaster.success('Media added successfully');
    });
  }

  saveChanges() {
    if (this.uploader.queue.length > 0) {
      let item = this.uploader.queue[0];
      item.upload();
      this.toaster.info('Photo change might take sometime to reflect');
    } else {
      this.addmedia();
    }
  }

  reset() {
    this.mediaAddForm.reset();
  }
}
