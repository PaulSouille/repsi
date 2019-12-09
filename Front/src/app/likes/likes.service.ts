import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostLikes } from './likes';

@Injectable()
export class LikesService  {

  constructor(
    private http: HttpClient
  ) {
   }

   countPostLikes(id_post: string): Promise<PostLikes> {
    return this.http.get<PostLikes>(`likes/${id_post}/count`).toPromise();
  }


}
