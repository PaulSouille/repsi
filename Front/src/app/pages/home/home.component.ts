import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { faLink, faShare, faSave, faCommentAlt, faArrowUp, faArrowDown, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faReddit } from '@fortawesome/free-brands-svg-icons';
import { PostsService } from 'src/app/posts/posts.service';
import { Post } from 'src/app/posts/posts';
import { Comment } from 'src/app/posts/posts';

import { LikesService } from 'src/app/likes/likes.service';

import { UsersService } from 'src/app/users/users.service';
import { MatSpinner } from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faLink = faLink;
  faReddit = faReddit;
  faShare = faShare;
  faSave = faSave;
  faCommentAlt = faCommentAlt;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  isAuth: boolean;
  isLoading: boolean = false;
  private posts: Post[];


  constructor(public auth: AuthService,
            public postsService: PostsService,
            public likesService: LikesService,
            public userService: UsersService) {}

  async ngOnInit() {
    this.isLoading = true;
    this.isAuth = await this.auth.isAuthenticated$.toPromise();
    if(this.isAuth){
      this.auth.userProfile$.subscribe(async (profile)=>{
        const user = await this.userService.getUserByEmail(profile.email)
        localStorage.setItem('userId', user.uuid);
      });
      console.log(localStorage.getItem('userId'));


      this.loadPost();

    }
  }

  async likePost(postId){
    this.likesService.addLike(postId, localStorage.getItem('userId'));
    this.loadPost();
  }

  async deleteLikePost(postId){
    this.likesService.removeLike(postId, localStorage.getItem('userId'));
    this.loadPost();

  }


  async loadPost(){
    this.isLoading = true;
    this.posts = await this.postsService.findPosts();
    this.posts.map(async (post: Post, i)=>{

      const number_likes = await this.likesService.countPostLikes(post.id);
      post.number_likes = number_likes.data.numberLikes;
      const is_liked_by_user = await this.likesService.isLikedByUser(post.id, localStorage.getItem('userId'))
      post.is_liked_by_user = is_liked_by_user.data.isLikedByUser;
      post.creator_user = await this.userService.getUserById(post.creator);
      if(i==this.posts.length-1){
        this.isLoading = false;
      }
      
    })
  }
}
