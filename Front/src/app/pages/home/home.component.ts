import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { faLink, faShare, faSave, faCommentAlt, faArrowUp, faArrowDown, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faReddit } from '@fortawesome/free-brands-svg-icons';
import { PostsService } from 'src/app/posts/posts.service';
import { Post } from 'src/app/posts/posts';
import { LikesService } from 'src/app/likes/likes.service';

import { UsersService } from 'src/app/users/users.service';
import { Comment } from 'src/app/posts/posts';
import { MatDialog } from '@angular/material';
import { AddPostDialog } from 'src/app/posts/add-post/add-post.dialog';

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
  isLoading: boolean = true;;
  private content: string;
  private posts: Post[];

  constructor(public auth: AuthService,
            public postsService: PostsService,
            public likesService: LikesService,
            public userService: UsersService,
            public dialog: MatDialog) {}

  async ngOnInit() {
    this.isAuth = await this.auth.isAuthenticated$.toPromise();
    if(this.isAuth){
      this.auth.userProfile$.subscribe(async (profile)=>{
        const user = await this.userService.getUserByEmail(profile.email)
        localStorage.setItem('userId', user.uuid);
      });
      await this.loadPost2();
      console.log('test');
      this.isLoading = false;
        }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPostDialog, {
      width: '250px',
      data: {content: this.content}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.content = result;
    });
  }

  hideComments($event){
    let main_div = $event.target.closest(".topic");
    
    let comment_div = main_div.getElementsByClassName("display")[0];
    let display = comment_div.getAttribute("comments");

    //Hide or show comments
    if(display == "show"){
      comment_div.setAttribute("comments","hidden")
      comment_div.classList.remove('show')
      comment_div.classList.add('hidden')
      
    }else{
      comment_div.setAttribute("comments","show")
      comment_div.classList.remove('hidden')
      comment_div.classList.add('show')  
    }

  }

  async addComment(postId,$event){
      let comment_add = $event.target.closest('.add_comment');
      let textarea = comment_add.getElementsByClassName('add_comment_content')[0];
      this.postsService.addComment(postId,localStorage.getItem('userId'),textarea.value);
      await this.loadPost2();
      this.isLoading= false;

    }
  async addLike(postId){
    this.likesService.addLike(postId, localStorage.getItem('userId'));
    await this.loadPost2();
    this.isLoading= false;

    }

  async deleteLike(postId){
    this.likesService.removeLike(postId, localStorage.getItem('userId'));
    await this.loadPost2();
    this.isLoading= false;

  }

  async loadPost(){
    this.isLoading = true;
    this.posts = await this.postsService.findPosts();
    this.posts.map(async (post: Post)=>{
      post.comments.map(async (comment: Comment)=>{
        comment.creator_user = await this.userService.getUserById(comment.creator);
        console.log(comment.creator_user);
        const number_likes = await this.likesService.countParentLikes(comment.id);
        comment.number_likes = number_likes.data.numberLikes;
        comment.post_id = post.id;
        const is_liked_by_user = await this.likesService.isLikedByUser(comment.id, localStorage.getItem('userId'))
        comment.is_liked_by_user = is_liked_by_user.data.isLikedByUser;
        comment.creator_user = await this.userService.getUserById(comment.creator);
      })
      const number_likes = await this.likesService.countParentLikes(post.id);
      post.number_likes = number_likes.data.numberLikes;
      const is_liked_by_user = await this.likesService.isLikedByUser(post.id, localStorage.getItem('userId'))
      post.is_liked_by_user = is_liked_by_user.data.isLikedByUser;
      post.creator_user = await this.userService.getUserById(post.creator);

    })
  }

  async loadPost2 ()  {
    this.isLoading = true;
    this.posts = await this.postsService.findPosts();

    await Promise.all(this.posts.map(async (post:Post) => {
      this.posts.map(async (post: Post)=>{
        await Promise.all(post.comments.map(async (comment:Comment) => {
          comment.creator_user = await this.userService.getUserById(comment.creator);
          console.log(comment.creator_user);
          const number_likes = await this.likesService.countParentLikes(comment.id);
          comment.number_likes = number_likes.data.numberLikes;
          comment.post_id = post.id;
          const is_liked_by_user = await this.likesService.isLikedByUser(comment.id, localStorage.getItem('userId'))
          comment.is_liked_by_user = is_liked_by_user.data.isLikedByUser;
          comment.creator_user = await this.userService.getUserById(comment.creator);
        }))
        const number_likes = await this.likesService.countParentLikes(post.id);
        post.number_likes = number_likes.data.numberLikes;
        const is_liked_by_user = await this.likesService.isLikedByUser(post.id, localStorage.getItem('userId'))
        post.is_liked_by_user = is_liked_by_user.data.isLikedByUser;
        post.creator_user = await this.userService.getUserById(post.creator);
  
      })
    }));
  }



}
