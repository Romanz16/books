import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Router } from '@angular/router';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  userLogin: string = '';
  userEmail: string = '';
  photoURL: string = '';
  products: Array<any> = [];
  adminProducts: Array<IProduct>;
  uid: string = '';
  sort1: Array<number> = [3, 3, 3, 3, 3, 3, 3];
  p: number = 1;
  constructor(public router: Router,private productCart: OrdersService, private productService: ProductsService, public authService: AuthService, public afAuth: AngularFireAuth) {
    if (!this.authService.isAdmin()){this.router.navigate(['/login']);};
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userLogin = JSON.parse(localStorage.getItem('user')).displayName; // Setting up user data in userData var
        this.userEmail = JSON.parse(localStorage.getItem('user')).email;
        this.photoURL = JSON.parse(localStorage.getItem('user')).photoURL;
        this.uid = JSON.parse(localStorage.getItem('user')).uid;
      }
      if (user === null) {
        this.userLogin = '';
      }

    });
    
    // if(this.userEmail !== 'zhyshkovych16@gmail.com'){this.router.navigate(['/login']);}

    this.productService.getProducts().subscribe(
      myArray => {
        this.adminProducts = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );
    this.productCart.getOrders().subscribe(
      myArray => {
        this.products = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        })
      }
    );
  }


  
}