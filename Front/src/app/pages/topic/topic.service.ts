import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { v4 as uuid } from 'uuid';
import { Post } from 'src/app/posts/posts';


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
