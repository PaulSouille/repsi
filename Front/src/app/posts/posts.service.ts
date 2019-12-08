import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './posts';

@Injectable()
export class PostsService  {

  constructor(
    private http: HttpClient
  ) {
   }

   findPosts(): Promise<Post[]> {
    return this.http.get<Post[]>('posts').toPromise();
  }


}
