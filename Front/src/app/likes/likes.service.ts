import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Likes } from './likes';

@Injectable()
export class LikesService {

  constructor(private http: HttpClient) { }

  async getLikeByParentUser(parentId): Promise<Likes> {
    return this.http.get<Likes>(`likes/${parentId}/count`).toPromise();
  }

}