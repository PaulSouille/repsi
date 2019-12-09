import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostLikes, LikesUser } from './likes';

@Injectable()
export class LikesService  {

  constructor(
    private http: HttpClient
  ) {
   }

   countParentLikes(id_post: string): Promise<PostLikes> {
    return this.http.get<PostLikes>(`likes/${id_post}/count`).toPromise();
  }

  isLikedByUser(parentId, userId): Promise<LikesUser>{
    return this.http.get<LikesUser>(`likes/${parentId}/${userId}`).toPromise();
  }
  addLike(parentId, userId): void{
    this.http.put(`likes/`,{
      parentid: parentId,
      userid: userId
    }).toPromise();
  }
  
  removeLike(parentId, userId): void{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {
        parentid: parentId,
        userid: userId  
      }
    };
    this.http.delete(`likes/`,httpOptions).toPromise();
    
  }

}
