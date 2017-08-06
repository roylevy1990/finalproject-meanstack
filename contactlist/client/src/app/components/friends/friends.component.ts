import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/authService/auth.service'
import {User} from '../../objects/user'
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  defaultImg:any;
  isLogged: boolean;
  constructor(
    private authService: AuthService,
    private user: User

  ) { }

  ngOnInit() {
    
    this.authService.getProfile().subscribe(profile => {
    this.user = profile.user;
    if(this.user){
    this.defaultImg="../../../assets/imgs/user.png";
    this.isLogged = true;
    }else{
    }
    },
  err => {
    console.log(err);
    this.isLogged = false;
    return false;
  });
  }

}
