import { Component, OnInit, NgModule } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  faLink = faLink;

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
