import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  userLogin: string = '';
  userEmail: string = '';
  photoURL: string = '';
  constructor(
    public authService: AuthService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userLogin = JSON.parse(localStorage.getItem('user')).displayName // Setting up user data in userData var
        this.userEmail = JSON.parse(localStorage.getItem('user')).email
        this.photoURL = JSON.parse(localStorage.getItem('user')).photoURL
      }
      if (user === null) {
        this.userLogin = '';
      }

    });
  }

}