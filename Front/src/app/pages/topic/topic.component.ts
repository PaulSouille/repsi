import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { faLink, faShare, faSave, faCommentAlt, faArrowUp, faArrowDown, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Post, Comment } from 'src/app/posts/posts';
import { PostsService } from 'src/app/posts/posts.service';
import { LikesService } from 'src/app/likes/likes.service';
import { UsersService } from 'src/app/users/users.service';


@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  faLink = faLink;
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

  constructor(public auth: AuthService,private route: ActivatedRoute,
              public postsService: PostsService,
              public likesService: LikesService,
              public userService: UsersService) { }

  ngOnInit() {
    this.loadPost()
  }

  async loadPost(){
    this.isLoading = true;
    this.posts = await this.postsService.findPostsByTopic(this.route.snapshot.params.topic);
    this.posts = this.postsService.fillPosts(this.posts)
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
