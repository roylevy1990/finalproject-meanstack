import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {AuthService} from '../../services/authService/auth.service';
import {UserService} from '../../services/userService/user.service';
import {Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {User} from '../../objects/user';

import * as firebase from 'firebase/app';
import 'firebase/storage';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user:  User;
  userImg: any;
  defaultImg: '../../../assets/imgs/user.png';
  imgFromDb: String;
  isAvatar: boolean;
  trustedUrl: any;
  storageRef: any;
  imgArr: Array<any>;
  content: String;
  posts: [any];
  constructor(
    private authService: AuthService,
    // private router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) { }
  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
    this.user = profile.user;
    if (this.user.avatar === '') {
      this.userImg = undefined;
    }else {
      this.userImg = this.sanitize(this.user.avatar);
    }
    this.userService.getMyPosts(this.user).subscribe((res) => this.posts = res.posts);
    },
  err => {
    console.log(err);
    return false;
  });

  }

  fileChangeEvent(event) {
    this.userImg = undefined;
    this.userService.uploadToFirebase(event, this.user.username).then(() => this.getUrlFromFirebase(this.user.username));
  }
  getUrlFromFirebase(username) {
  const storageRef = firebase.storage().ref().child('userImgs/' + username + '-avatar.jpg');
     storageRef.getDownloadURL().then(url => {this.userImg = url; });
  }
    sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}
addPost() {
  const post = {
    author: this.user.username,
    content: this.content,
    avatar: this.user.avatar
  };
  this.content = ' ';
  this.userService.addPost(post).subscribe(res => {});
  this.userService.getMyPosts(this.user).subscribe((res) => this.posts = res.posts);
}
deletePost(id) {
  this.userService.deletePost(id).subscribe(res => {});
  this.userService.getMyPosts(this.user).subscribe((res) => this.posts = res.posts);
}
likePost(id) {
  this.userService.likePost(id).subscribe(res => {});
  this.userService.getMyPosts(this.user).subscribe((res) => this.posts = res.posts);
}
showLikes(id) {

}
}
