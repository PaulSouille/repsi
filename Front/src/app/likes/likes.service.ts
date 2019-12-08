import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LikesService  {

  constructor(
    private http: HttpClient
  ) {
   }

   findPosts(): Promise<Post[]> {
    return this.http.get<Post[]>('posts').toPromise();
  }


}
