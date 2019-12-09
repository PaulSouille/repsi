import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostLikes, LikesUser } from './likes';

@Injectable()
export class LikesService  {

  constructor(
    private http: HttpClient
  ) {
   }

   countPostLikes(id_post: string): Promise<PostLikes> {
    return this.http.get<PostLikes>(`likes/${id_post}/count`).toPromise();
  }

  isLikedByUser(parentId, userId): Promise<LikesUser>{
    return this.http.get<LikesUser>(`likes/${parentId}/${userId}`).toPromise();
  }
  addLike(parentId, userId): Promise<any>{
    return this.http.put(`likes/`,{
      parentid: parentId,
      userid: userId
    }).toPromise();
  }

  removeLike(parentId, userId){
    
  }

}
