import { Component, OnInit } from '@angular/core';
import { faLink, faShare, faSave, faCommentAlt, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faReddit } from '@fortawesome/free-brands-svg-icons';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  faLink = faLink;
  faReddit = faReddit;
  faShare = faShare;
  faSave = faSave;
  faCommentAlt = faCommentAlt;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;


  constructor() { }

  ngOnInit() {
  }

}
