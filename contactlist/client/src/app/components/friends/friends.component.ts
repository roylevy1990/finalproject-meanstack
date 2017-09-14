import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authService/auth.service';
import {UserService} from '../../services/userService/user.service';

import {User} from '../../objects/user';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  defaultImg: any;
  friends: User[];
  constructor(
    private authService: AuthService,
    private user: User,
    private userService: UserService

  ) { }

  ngOnInit() {
        // this.userService.getMembers().subscribe((users) => this.users = users);

       // getProfile
        this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
        this.userService.getFriendsList(this.user).subscribe(friends => {this.friends = friends.friendsList; }
        ); },
  err => {
    console.log(err);
    return false;
  });
  }

}
