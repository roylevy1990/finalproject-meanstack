import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/userService/user.service'
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
  constructor(private userService: UserService ) { }
    
 

  ngOnInit() {
    this.userService.getMembers().subscribe((users) => this.users = users);
    // this.userService.getFriends();
    
  }
addFriend = function(friendUsername){
  this.userService.addFriend(friendUsername).subscribe(res=>{});
} 
}
