import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // users: Array<IUser> = [];
  // user: IUser;
  // login: string;
  // password: string;
  // check = false;


  constructor( public authService: AuthService) { }

  ngOnInit() {

    // this.userService.getUser().subscribe(
    //   myArray => {
    //     this.users = myArray.map(item => {
    //       return {
    //         id: item.payload.doc.id,
    //         ...item.payload.doc.data()
    //       } as any;
    //     });
    //   }
    // );
  }


  // public loginUser(): void {
  //   for (let i = 0; i < this.users.length; i++) {
  //     if (this.users[i].login === this.login && this.users[i].password === this.password) {
  //       this.user = Object.assign({}, this.users[i]);
  //       let userJson = JSON.stringify(this.user);
  //       localStorage.setItem('users', userJson);
  //       this.check = true;
  //       break;
  //     }
  //   }
  // }
}
