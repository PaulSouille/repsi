import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { faLink, faShare, faSave, faCommentAlt, faArrowUp, faArrowDown, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faReddit } from '@fortawesome/free-brands-svg-icons';
import { PostsService } from 'src/app/posts/posts.service';
import { Post } from 'src/app/posts/posts';

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
            public likesService: LikesService) {}

  async ngOnInit() {
    this.isLoading = true;
    this.isAuth = await this.auth.isAuthenticated$.toPromise();
    this.posts = await this.postsService.findPosts();
    this.posts.map((post: Post)=>{
      post.number_likes = this.likesService.countPostLikes(post.id);
    })
    this.isLoading = false;
    console.log(this.posts)

  }
}
