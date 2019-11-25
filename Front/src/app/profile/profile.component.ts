import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { LikesService } from 'app/likes/likes.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;

  constructor(public auth: AuthService,private likesService: LikesService) { }

  ngOnInit() {
    this.likesService.getLikeByParentUser('test');
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

}
