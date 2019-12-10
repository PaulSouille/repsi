import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightModule } from 'ngx-highlightjs';
import json from 'highlight.js/lib/languages/json';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule, MatCardModule, MatSpinner, MatProgressSpinnerModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TopicComponent } from './pages/topic/topic.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { LikesComponent } from './likes/likes.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { PostsService } from './posts/posts.service';
import { LikesService } from './likes/likes.service';
import { UsersService } from './users/users.service';
import { StorageServiceModule } from 'ngx-webstorage-service';

export function hljsLanguages() {
  return [{ name: 'json', func: json }];
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NavBarComponent,
    FooterComponent,
    LoadingComponent,
    PostsComponent,
    UsersComponent,
    LikesComponent,
    AddPostComponent,
    TopicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    FontAwesomeModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatCardModule,
    StorageServiceModule,
    MatButtonModule
  ],
  providers: [
    PostsService,
    LikesService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
