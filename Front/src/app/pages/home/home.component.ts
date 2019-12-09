import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { faLink, faShare, faSave, faCommentAlt, faArrowUp, faArrowDown, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faReddit } from '@fortawesome/free-brands-svg-icons';
import { PostsService } from 'src/app/posts/posts.service';
import { Post } from 'src/app/posts/posts';
import { LikesService } from 'src/app/likes/likes.service';

import { UsersService } from 'src/app/users/users.service';
import { Comment } from 'src/app/posts/posts';

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

  hideComments($event){
    let main_div = $event.target.closest(".topic");
    let display = main_div.getAttribute("comments");
    
    let comment_div = main_div.getElementsByClassName("comment");
    console.log(comment_div)
    if(display == "show"){
      main_div.setAttribute("comments","hidden")
      for (let comment of comment_div) {
        comment.classList.remove('show')
        comment.classList.add('hidden')
      }
    }else{
      main_div.setAttribute("comments","show")
      for (let comment of comment_div) {
        comment.classList.remove('hidden')
        comment.classList.add('show')
      }
    }

  }

  async addLike(postId){
    this.likesService.addLike(postId, localStorage.getItem('userId'));
    this.loadPost();
  }

  async deleteLike(postId){
    this.likesService.removeLike(postId, localStorage.getItem('userId'));
    this.loadPost();

  }

  async loadPost(){
    this.isLoading = true;
    this.posts = await this.postsService.findPosts();
    this.posts.map(async (post: Post, i)=>{
      post.comments.map(async (comment: Comment)=>{
        comment.creator_user = await this.userService.getUserById(comment.creator);
        const number_likes = await this.likesService.countParentLikes(comment.id);
        comment.number_likes = number_likes.data.numberLikes;
        const is_liked_by_user = await this.likesService.isLikedByUser(comment.id, localStorage.getItem('userId'))
        comment.is_liked_by_user = is_liked_by_user.data.isLikedByUser;
        comment.creator_user = await this.userService.getUserById(comment.creator);
      })
      const number_likes = await this.likesService.countParentLikes(post.id);
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
