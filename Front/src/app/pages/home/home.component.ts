import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { faLink, faShare, faSave, faCommentAlt, faArrowUp, faArrowDown, faThumbsUp, faThumbsDown, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
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
  faExternalLinkAlt = faExternalLinkAlt;
  faCommentAlt = faCommentAlt;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  isAuth: boolean;
  isLoading: boolean;
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
      await this.loadPost();
      console.log('test');
        }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPostDialog, {
      width: '250px',
      data: {content: this.content}
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.content = result;
      await this.loadPost();
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
      await this.loadPost();

    }
  async addLike(postId){
    this.likesService.addLike(postId, localStorage.getItem('userId'));
    await this.loadPost();

    }

  async deleteLike(postId){
    this.likesService.removeLike(postId, localStorage.getItem('userId'));
    await this.loadPost();

  }

  async loadPost(){
    this.isLoading = true;
    this.posts = await this.postsService.findPosts();
    this.posts = this.postsService.fillPosts(this.posts)
    this.isLoading = false;
  }
  



}
