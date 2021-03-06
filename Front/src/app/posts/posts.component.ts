import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { Post } from './posts';
import { ActivatedRoute } from '@angular/router';
import { faLink, faShare, faSave, faCommentAlt, faArrowUp, faArrowDown, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { LikesService } from '../likes/likes.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  faLink = faLink;
  faShare = faShare;
  faSave = faSave;
  faCommentAlt = faCommentAlt;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  private post : Post;

  constructor( public postsService: PostsService,
    public likesService: LikesService,
    private route: ActivatedRoute ) {}

  ngOnInit(){
    this.loadPost()
  }

  async loadPost(){
    this.post = await this.postsService.findPost(this.route.snapshot.paramMap.get("post_id"));
    this.post = await this.postsService.fillPost(this.post)

    console.log(this.post)
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
