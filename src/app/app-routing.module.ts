import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { HomeComponent } from './home/home.component';
import { JournalistAddComponent } from './journalists/journalist-add/journalist-add.component';
import { JournalistDetailComponent } from './journalists/journalist-detail/journalist-detail.component';
import { JournalistListComponent } from './journalists/journalist-list/journalist-list.component';
import { JournalistRatingComponent } from './journalists/journalist-rating/journalist-rating.component';
import { MediaAddComponent } from './media/media-add/media-add.component';
import { MediaListComponent } from './media/media-list/media-list.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { TopicAddComponent } from './topic/topic-add/topic-add.component';
import { TopicListComponent } from './topic/topic-list/topic-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'addjournalist',
        component: JournalistAddComponent,
      },
      {
        path: 'ratejournalist',
        component: JournalistRatingComponent,
      },
      {
        path: 'addtopic',
        component: TopicAddComponent,
      },
      {
        path: 'addmedia',
        component: MediaAddComponent,
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        canDeactivate: [PreventUnsavedChangesGuard],
      },
    ],
  },
  { path: 'journalists', component: JournalistListComponent },
  { path: 'journalist/:id', component: JournalistDetailComponent },
  { path: 'media', component: MediaListComponent },
  { path: 'topic', component: TopicListComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
