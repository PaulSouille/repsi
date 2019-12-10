import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { Post } from './posts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  private post : Post;

  constructor( public postsService: PostsService,
    private route: ActivatedRoute ) {}

  ngOnInit(){
    this.loadPost()
  }

  async loadPost(){
    this.post = await this.postsService.findPost(this.route.snapshot.paramMap.get("post_id"));
    console.log(this.post)
  }
}
