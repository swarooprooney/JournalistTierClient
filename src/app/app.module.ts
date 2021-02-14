import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RatingModule } from 'ngx-bootstrap/rating';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JournalistDetailComponent } from './journalists/journalist-detail/journalist-detail.component';
import { ListsComponent } from './lists/lists.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { JournalistListComponent } from './journalists/journalist-list/journalist-list.component';
import { JournalistAddComponent } from './journalists/journalist-add/journalist-add.component';
import { MediaListComponent } from './media/media-list/media-list.component';
import { TopicListComponent } from './topic/topic-list/topic-list.component';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from './_modules/shared.module';
import { ErrorInterceptor } from './_interceptor/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JournalistRatingComponent } from './journalists/journalist-rating/journalist-rating.component';
import { TopicAddComponent } from './topic/topic-add/topic-add.component';
import { JournalistCardComponent } from './journalists/journalist-card/journalist-card.component';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptor/loading.interceptor';
import { FileUploadModule } from 'ng2-file-upload';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { MediaAddComponent } from './media/media-add/media-add.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    AppComponent,
    JournalistDetailComponent,
    ListsComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    JournalistListComponent,
    JournalistAddComponent,
    MediaListComponent,
    TopicListComponent,
    NotFoundComponent,
    ServerErrorComponent,
    JournalistRatingComponent,
    TopicAddComponent,
    JournalistCardComponent,
    MemberEditComponent,
    TextInputComponent,
    DateInputComponent,
    MediaAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RatingModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule,
    TabsModule.forRoot(),
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    CollapseModule,

    CollapseModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
