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
    this.posts = await this.postsService.findPosts();
    
  }

}
