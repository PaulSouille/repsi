import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Post, Comment } from './posts';
import { v4 as uuid } from 'uuid';
import { UsersService } from '../users/users.service';
import { LikesService } from '../likes/likes.service';


@Injectable()
export class PostsService  {

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private likesService: LikesService
  ) {
   }

  findPosts(): Promise<Post[]> {
    return this.http.get<Post[]>('posts').toPromise();
  }

  findPostsByTopic(topic_name): Promise<Post[]> {
    return this.http.get<Post[]>('posts/topics/'+topic_name+"/posts").toPromise();
  }

  findPostsByUser(user_id): Promise<Post[]> {
    return this.http.get<Post[]>('posts/users/'+user_id+"/posts").toPromise();
  }
  
  findPost(post_id): Promise<Post> {
    return this.http.get<Post>('posts/?id='+post_id).toPromise();
  }

  addComment(post_id, userId, content): void{
    var date = new Date();
    this.http.post(`posts/`+post_id+`/comments/`,{
        creator: userId,
        content: content,
        creation_date: date.toString()
    }).toPromise();
    
  }

  fillPosts(posts: Post[]): Post[]{
    posts.map(async (post: Post, i)=>{
      if(post.comments != null){
        post.comments.map(async (comment: Comment)=>{
          comment.creator_user = await this.usersService.getUserById(comment.creator);
          const number_likes = await this.likesService.countParentLikes(comment.id);
          comment.number_likes = number_likes.data.numberLikes;
          comment.post_id = post.id;
          const is_liked_by_user = await this.likesService.isLikedByUser(comment.id, localStorage.getItem('userId'))
          comment.is_liked_by_user = is_liked_by_user.data.isLikedByUser;
          comment.creator_user = await this.usersService.getUserById(comment.creator);
          console.clear();
        })
      }
     
      const number_likes = await this.likesService.countParentLikes(post.id);
      post.number_likes = number_likes.data.numberLikes;
      const is_liked_by_user = await this.likesService.isLikedByUser(post.id, localStorage.getItem('userId'))
      post.is_liked_by_user = is_liked_by_user.data.isLikedByUser;
      post.creator_user = await this.usersService.getUserById(post.creator);
    })

    return posts;
  }

  async fillPost(post: Post) : Promise<Post>{
   
      if(post.comments != null){
        post.comments.map(async (comment: Comment)=>{
          comment.creator_user = await this.usersService.getUserById(comment.creator);
          const number_likes = await this.likesService.countParentLikes(comment.id);
          comment.number_likes = number_likes.data.numberLikes;
          comment.post_id = post.id;
          const is_liked_by_user = await this.likesService.isLikedByUser(comment.id, localStorage.getItem('userId'))
          comment.is_liked_by_user = is_liked_by_user.data.isLikedByUser;
          comment.creator_user = await this.usersService.getUserById(comment.creator);
          console.clear();
        })
      }
     
      const number_likes = await this.likesService.countParentLikes(post.id);
      post.number_likes = number_likes.data.numberLikes;

      const is_liked_by_user = await this.likesService.isLikedByUser(post.id, localStorage.getItem('userId'))
      post.is_liked_by_user = is_liked_by_user.data.isLikedByUser;
      post.creator_user = await this.usersService.getUserById(post.creator);
    
      return post;
  }


}
