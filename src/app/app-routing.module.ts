import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JournalistAddComponent } from './journalists/journalist-add/journalist-add.component';
import { JournalistDetailComponent } from './journalists/journalist-detail/journalist-detail.component';
import { JournalistListComponent } from './journalists/journalist-list/journalist-list.component';
import { MediaListComponent } from './media/media-list/media-list.component';
import { TopicListComponent } from './topic/topic-list/topic-list.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'addjournalists',
        component: JournalistAddComponent,
      },
    ],
  },
  { path: 'journalists', component: JournalistListComponent },
  { path: 'journalists/:id', component: JournalistDetailComponent },
  { path: 'media', component: MediaListComponent },
  { path: 'topic', component: TopicListComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
