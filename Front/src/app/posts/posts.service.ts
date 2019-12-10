import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Post } from './posts';
import { v4 as uuid } from 'uuid';


@Injectable()
export class PostsService  {

  constructor(
    private http: HttpClient
  ) {
   }

   findPosts(): Promise<Post[]> {
    return this.http.get<Post[]>('posts').toPromise();
  }

  
  findPost(post_id): Promise<Post> {
    return this.http.get<Post>('posts?id='+post_id).toPromise();
  }

  addComment(post_id, userId, content): void{
    var date = new Date();
    this.http.post(`posts/`+post_id+`/comments/`,{
        id: uuid(),
        creator: userId,
        content: content,
        creation_date: date.toString()
    }).toPromise();
  }


}
