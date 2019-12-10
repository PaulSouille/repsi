import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PostsService } from 'src/app/posts/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/posts/posts';
import { LikesService } from 'src/app/likes/likes.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileJson: string = null;
  public posts : Post[];

  constructor(public auth: AuthService, public postsService : PostsService, public route : ActivatedRoute, public likesService : LikesService) { }

  ngOnInit() {
    this.loadPost()
  }

  async loadPost(){
    this.posts = await this.postsService.findPostsByUser(localStorage.getItem('userId'));
    this.posts = await this.postsService.fillPosts(this.posts)
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
}
