import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { User } from 'src/app/shared/interfaces/myuser.interface';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  userLogin: string = '';
  userEmail: string = '';
  emailVerified: boolean;
  photoURL: string = '';
  products: Array<any> = [];
  adminProducts: Array<IProduct>;
  uid: string = '';
  sort1: Array<number> = [3, 3, 3, 3, 3, 3, 3];
  phone: string = '';
 gender= '';
  date: string = '';
  city: string = '';
  usersDetails: Array<any> = [
    {
      phone:'',
      date: '',
      gender: '',
      uid: '',
      city: '',
    }
  ];
  constructor(private firestore: AngularFirestore, private toastr: ToastrService, private productCart: OrdersService, private productService: ProductsService, public authService: AuthService, public afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userLogin = JSON.parse(localStorage.getItem('user')).displayName; // Setting up user data in userData var
        this.userEmail = JSON.parse(localStorage.getItem('user')).email;
        this.emailVerified = JSON.parse(localStorage.getItem('user')).emailVerified;
        this.photoURL = JSON.parse(localStorage.getItem('user')).photoURL;
        this.uid = JSON.parse(localStorage.getItem('user')).uid;

      }
      if (user === null) {
        this.userLogin = '';
      }

    });
    this.productService.getUserDetails().subscribe(
      myArray => {
        this.usersDetails = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        }).filter(elem =>  {
          if (elem.uid === this.uid) {
          this.phone = elem.phone || '';
          this.gender = elem.gender || '';
          this.city = elem.city || '';
          this.date = elem.date || '';
            return elem;
          }
        });
      }
    );
    // this.usersDetails= Object.assign({}, this.productService.getOneUser(this.uid));
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
        }).filter(elem => elem.uid === this.uid);
      }
    );
  }

  public myaccount(): void {
    if (this.phone === '' || this.phone.length!=10) {
      this.toastr.error("Введіть коректний номер телефону!","Увага!");
    }

    else {
      let obj: any = {
        phone: this.phone,
        date: this.date,
        gender: this.gender,
        uid: this.uid,
        city: this.city
      };
      // this.firestore.doc('usersDetails/' + this.uid).update(obj);
      // this.firestore.doc('usersDetails/' + this.uid).delete()
      this.firestore.collection('usersDetails').doc(this.uid).set(obj);
      this.toastr.success("Контактні дані успішно оновлено!");
    }
  }
}
