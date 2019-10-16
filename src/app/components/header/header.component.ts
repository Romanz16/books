import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Location } from '@angular/common';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { UsersService } from 'src/app/shared/services/users.service';
// import { StorageMap } from '@ngx-pwa/local-storage';

import { AuthService } from "../../shared/services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IOrderProduct } from 'src/app/shared/interfaces/orderproduct';

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
  // users: Array<IUser> = [];
  // check = false;
  // mylogin: string = '';
  // myuser: Array<string>;
  count = 0;
  totalPrice: number = 0;
  userLogin: string = '';
  // products: Array<IProduct> = [];
  products: Array<IOrderProduct> = [];
  constructor(public afAuth: AngularFireAuth, public authService: AuthService, private userService: UsersService, private categoryService: CategoryService, private firestore: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userLogin = JSON.parse(localStorage.getItem('user')).displayName // Setting up user data in userData var
        if (this.userLogin === null) { this.userLogin = JSON.parse(localStorage.getItem('user')).email }
      }
      if (user === null) {
        this.userLogin = '';
      }

    });
    this.products = this.userService.getData();
    if (this.products !==null) {
      this.count = this.products.length;
      for (let i = 0; i < this.products.length; i++) {
        this.totalPrice += +(this.products[i].price);
        this.totalPrice = +this.totalPrice.toFixed(2);
      }
    }

    this.userService.onproducts.subscribe(cnt => {
      this.products = cnt;
      if (this.products!=null) {
        this.count = this.products.length;
        this.totalPrice = 0;
        for (let i = 0; i < this.products.length; i++) {
          this.totalPrice += +(this.products[i].price)*this.products[i].count;
          this.totalPrice = +this.totalPrice.toFixed(2);
        }
      }
    })
  }

  ngOnInit() {
    this.getCategories();
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
    if (event.target.innerWidth > 600) {
      this.ulMenuHeight = '41px';
      this.ulMenu = 'flex';
    } else {
      this.ulMenu = 'none';
    }
  }
}
