import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JournalistDetailComponent } from './journalists/journalist-detail/journalist-detail.component';
import { ListsComponent } from './lists/lists.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { JournalistListComponent } from './journalists/journalist-list/journalist-list.component';
import { JournalistAddComponent } from './journalists/journalist-add/journalist-add.component';
import { MediaListComponent } from './media/media-list/media-list.component';
import { TopicListComponent } from './topic/topic-list/topic-list.component';
import { ToastrModule } from 'ngx-toastr';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
