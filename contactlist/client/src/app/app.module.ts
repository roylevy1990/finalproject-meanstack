import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MembersComponent } from './components/members/members.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {FriendsComponent} from './components/friends/friends.component';
import { AngularFireModule } from 'angularfire2';
import {ValidateService} from './services/validate-service/validate.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthService} from './services/authService/auth.service';
import {UserService} from './services/userService/user.service';
import {AuthGuard} from './guards/auth.guard';
import {User} from './objects/user';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import * as firebase from 'firebase';
export const firebaseConfig = {
 apiKey: 'AIzaSyBtY-1xi8vOI6RjS5-6F4jan1PABcX8rUw',
 authDomain: 'dobble-e1c3e.firebaseapp.com',
 databaseURL: 'https://dobble-e1c3e.firebaseio.com',
 projectId: 'dobble-e1c3e',
 storageBucket: 'dobble-e1c3e.appspot.com',
 messagingSenderId: '626821357079'
};
firebase.initializeApp(firebaseConfig);


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'friends', component: FriendsComponent, canActivate: [AuthGuard]},
  {path: 'members', component: MembersComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
];
@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    NavbarComponent,
    HomeComponent,
    MembersComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFontAwesomeModule,
  ],
  providers: [ValidateService, AuthService, UserService, AuthGuard, User],
  bootstrap: [AppComponent]
})
export class AppModule { }
