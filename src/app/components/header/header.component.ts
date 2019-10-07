import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { UsersService } from 'src/app/shared/services/users.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
// import { StorageMap } from '@ngx-pwa/local-storage';

import { AuthService } from "../../shared/services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  ulMenu: string;
  ulMenuHeight: string;
  checkMenu: boolean = true;
  searchText: string;
  adminCategories: Array<ICategory>;
  users: Array<IUser> = [];
  check = false;
  mylogin: string = '';
  myuser: Array<string>;
  userLogin: string='';

  constructor(public afAuth: AngularFireAuth,public authService: AuthService, private userService: UsersService, private categoryService: CategoryService, private firestore: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userLogin =  JSON.parse(localStorage.getItem('user')).displayName // Setting up user data in userData var
      }
      if (user ===null){
        this.userLogin='';
      }
      //   localStorage.setItem('user', JSON.stringify(this.userLogin));
      //   JSON.parse(localStorage.getItem('user'));
      // } else {
      //   localStorage.setItem('user', null);
      //   JSON.parse(localStorage.getItem('user'));
      // }
      console.log('auth=',this.userLogin);
    })
  }

  ngOnInit() {
    // this.authService.UserData().subscribe(
    //   myArray => {
    //     this.myuser = myArray.map(item => {
    //       return {
    //         id: item.payload.doc.id,
    //         ...item.payload.doc.data()
    //       } as any;
    //     });
    //   }
    // );
    // let user = { firstName: 'Henri', lastName: 'Bergson' };
    // this.storage.set('user', user).subscribe(() => { });


    this.userService.getUser().subscribe(
      myArray => {
        this.users = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );
    this.getCategories();
    // this.login();
  }
  public getCategories(): void {
    this.categoryService.getCategories().subscribe(
      myArray => {
        this.adminCategories = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );
  }
  // public login(): void {
  //   if (localStorage.length > 0) {
  //     const getJson = localStorage.getItem('users');
  //     let user = JSON.parse(getJson);
  //     this.check = true;
  //     this.mylogin = user.login;
    
  //   }
  // }
  public exit(): void {
    localStorage.removeItem('users');
    this.check = false;
  }

  public menu(): void {
    if (this.checkMenu) {
      this.ulMenuHeight = '205px';
      this.ulMenu = 'flex';
      this.checkMenu = false;
    } else {
      this.ulMenuHeight = '41px';
      this.checkMenu = true;
      this.ulMenu = 'none';
    }
  }
  onResize(event) {
    if (event.target.innerWidth > 400) {
      this.ulMenuHeight = '41px';
      this.ulMenu = 'flex';
    } else {
      this.ulMenu = 'none';
    }
  }
}
