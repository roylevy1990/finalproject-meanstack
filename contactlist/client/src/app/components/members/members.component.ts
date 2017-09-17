import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/userService/user.service';
import {AuthService} from '../../services/authService/auth.service';

import {User} from '../../objects/user';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
 users: User[];
   user: User;
   first_name: string;
   last_name: string;
   email: string;
  constructor(
    private userService: UserService,
    private authService: AuthService,
 ) { }


  ngOnInit() {
    // getProfile
        this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
        this.userService.getMembers(this.user).subscribe((users) => this.users = users.members);
    },
  err => {
    console.log(err);
    return false;
  });

    // this.userService.getFriends();

  }
addFriend = function(friendUsername){
  this.userService.addFriend(friendUsername).subscribe(res => {});
  this.userService.getMembers(this.user).subscribe((users) => this.users = users.members);
};
}
