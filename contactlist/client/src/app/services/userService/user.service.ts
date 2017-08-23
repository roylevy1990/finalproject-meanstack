import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from '../../objects/user';
import {AuthService} from '../../services/authService/auth.service';
// import * as firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/storage';
@Injectable()
export class UserService {
  user: User;
  filesToUpload: Array<File> = [];
  image: any;
  constructor(
    private http: Http,
    private authService: AuthService
) 
{
       this.authService.getProfile().subscribe(profile => {
    this.user = profile.user;
    },
  err => {
    console.log(err);
    return false;
  });
     }


 
uploadToFirebase(event,username): firebase.Promise<any>{
   let fileList: FileList = event.target.files;
    var storageRef = firebase.storage().ref().child('userImgs/'+username+'-avatar.jpg');
     if(fileList.length > 0) {
        let file: File = fileList[0];
        storageRef.getDownloadURL().then(url => {this.updateAvatarInDb(this.user, url).subscribe(res => {});});
        return storageRef.put(file);
     }

}

updateAvatarInDb(user, url){
user.avatar = url;
 let headers = new Headers();
 headers.append('Content-Type', 'application/json');
 return this.http.post('http://localhost:3000/api/updateAvatar', user, {headers: headers})
 .map(function(res){
      return res.json();
    });
  }
getMembers(){
  return this.http.get('http://localhost:3000/api/members')
      .map(function(res) {
        return res.json();
      });
}

addFriend(friendUsername){
  console.log("adding "+friendUsername);
   let headers = new Headers();
 headers.append('Content-Type', 'application/json');
  return this.http.post('http://localhost:3000/api/addFriend/'+friendUsername,this.user, {headers: headers})
  .map(function(res){
    return res.json();
  });
}

}