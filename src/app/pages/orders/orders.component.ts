import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { UsersService } from 'src/app/shared/services/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { IOrderProduct } from 'src/app/shared/interfaces/orderproduct';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  // products: Array<IProduct> = [];
  // count: Array<string> = [];
  orderproducts: Array<IOrderProduct> = [];
  totalPrice = 0;
  userLogin: string = '';
  userEmail: string = '';
  photoURL: string = '';
  phone: string = '';
  uid: string = '';
  myOrder: boolean = false;
  btnDisable: boolean = false;
  constructor(private toastr: ToastrService, private userService: UsersService, public afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.orderproducts = userService.getData();

    for (let i = 0; i < this.orderproducts.length; i++) {
      this.totalPrice += this.orderproducts[i].count * +this.orderproducts[i].price;
    }
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
  }
  public deleteProduct(prod: IProduct, i: number): void {
    this.userService.deleteData(i);
    this.orderproducts.splice(i,1);
    this.totalPriceFunc();
  }
  public totalPriceFunc(): void {
    this.totalPrice = 0;
    for (let i = 0; i < this.orderproducts.length; i++) {
      this.totalPrice += this.orderproducts[i].count * +this.orderproducts[i].price;
    }
    this.totalPrice = +this.totalPrice.toFixed(2);
  }

  public counter(): void {
    this.userService.deleteAllData();
    for (let i = 0; i < this.orderproducts.length; i++) {
      this.userService.setData(this.orderproducts[i]);
    }
    this.totalPriceFunc();
  }   

  public orders(): void {
    let uorderIdProduct: Array<string> = [];
    let uorderCount: Array<number> = [];
    if (this.orderproducts.length === 0) { this.toastr.info('Ви не обрали жодного товару','Увага'); }
    else {
      if (this.phone === '') {
        this.toastr.error("Введіть контактний номер телефону!"); }
        
      else {
        for (let i = 0; i < this.orderproducts.length; i++) {
          uorderIdProduct[i] = this.orderproducts[i].id;
          // uorderCount[i] = +this.count[this.products[i].id];
          uorderCount[i] = this.orderproducts[i].count;
        }
        let date = new Date();
        let data: any = {
          'uemail': this.userEmail,
          'uid': this.uid,
          'uname': this.userLogin,
          'uphone': this.phone,
          'totalPrice': this.totalPrice,
          'uorderIdProduct': uorderIdProduct,
          'uorderCount': uorderCount,
          'date': date
        }
        this.firestore.collection('orders').add(data);
        this.orderproducts = [];
        this.totalPrice = 0;
        this.userService.deleteAllData();
        this.myOrder = true;
      }
    }
  }

}
