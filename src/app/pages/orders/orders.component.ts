import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { UsersService } from 'src/app/shared/services/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { IOrderProduct } from 'src/app/shared/interfaces/orderproduct';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/shared/services/products.service';
import { SendgridService } from 'ngx-sendgrid';
// import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient } from '@angular/common/http';
// import * as nodemailer from 'nodemailer';



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
  nologinUser = {
    phone: '',
    email: '',
    login: '',
    uid: '',
  };
  usersDetails: Array<any> = [
    {
      phone: '',
      date: '',
      gender: '',
      uid: '',
      city: '',
    }];
  oneusersDetails =
    {
      phone: '',
      date: '',
      gender: '',
      uid: '',
      city: '',
    }

  constructor(private http: HttpClient, private productService: ProductsService, private toastr: ToastrService, private userService: UsersService, public afAuth: AngularFireAuth, private firestore: AngularFirestore) {
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
    this.productService.getUserDetails().subscribe(
      myArray => {
        this.usersDetails = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        }).filter(elem => {
          if (elem.uid === this.uid) {
            this.phone = elem.phone || '';
            return elem;
          }
        });
      }
    );
  }
  public deleteProduct(prod: IProduct, i: number): void {
    this.userService.deleteData(i);
    this.orderproducts.splice(i, 1);
    this.totalPriceFunc();
  }
  public totalPriceFunc(): void {
    this.totalPrice = 0;
    for (let i = 0; i < this.orderproducts.length; i++) {
      this.totalPrice += this.orderproducts[i].count * +this.orderproducts[i].price;
    }
    this.totalPrice = +this.totalPrice.toFixed(2);
  }

  // public counter(): void {
  //   this.userService.deleteAllData();
  //   for (let i = 0; i < this.orderproducts.length; i++) {
  //     this.userService.setData(this.orderproducts[i]);
  //   }
  //   this.totalPriceFunc();
  // }
 

  public orders(): void {
    let uorderIdProduct: Array<string> = [];
    let uorderCount: Array<number> = [];
    if (this.orderproducts.length === 0) { this.toastr.info('Ви не обрали жодного товару', 'Увага'); }
    else {
      if (this.phone === '' || this.phone.length != 10) {
        this.toastr.error("Введіть контактний номер телефону!");
      }
      else {
        for (let i = 0; i < this.orderproducts.length; i++) {
          uorderIdProduct[i] = this.orderproducts[i].id;
          uorderCount[i] = this.orderproducts[i].count;
        }
        this.phone = this.phone || '';
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

        // this.sendEmail();
          }
    }
  }

  public nologinorders(): void {
    let uorderIdProduct: Array<string> = [];
    let uorderCount: Array<number> = [];
    let check = true;
    if (this.orderproducts.length === 0) {
      this.toastr.info('Ви не обрали жодного товару', 'Увага');
      check = false;
    }
    if (this.nologinUser.login === '') {
      this.toastr.error("Введіть Ваше імя!", "Увага!");
      check = false;
    }
    if (this.nologinUser.phone === '' || this.nologinUser.phone.length != 10) {
      this.toastr.error("Введіть коректний номер телефону!", "Увага!");
      check = false;
    }

    let re = /\S+@\S+\.\S+/;

    if (this.nologinUser.email === '') {
      this.toastr.error("Введіть Email!", "Увага!");
      check = false;
    } else {
      if (!re.test(this.nologinUser.email)) {
        this.toastr.error("Введіть коректний Email!", "Увага!");
        check = false;
      }
    }

    if (check) {
      for (let i = 0; i < this.orderproducts.length; i++) {
        uorderIdProduct[i] = this.orderproducts[i].id;
        uorderCount[i] = this.orderproducts[i].count;
      }
      let date = new Date();
      let data: any = {
        'uemail': this.nologinUser.email,
        'uid': '',
        'uname': this.nologinUser.login,
        'uphone': this.nologinUser.phone,
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
  public decCount(i: number): void {
    if (this.orderproducts[i].count > 1) {
      --this.orderproducts[i].count;
      this.userService.deleteAllData();
      for (let i = 0; i < this.orderproducts.length; i++) {
        this.userService.setData(this.orderproducts[i]);
      }
      this.totalPriceFunc();
    }
  }
  public incCount(i: number): void {
    this.orderproducts[i].count++;
    this.userService.deleteAllData();
    for (let i = 0; i < this.orderproducts.length; i++) {
      this.userService.setData(this.orderproducts[i]);
    }
    this.totalPriceFunc();
  }
  public sendEmail(): void {
    // let transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   host: 'smtp.gmail.com',
    //   secure: 'true',
    //   port: '465',
    //   auth: {
    //     user: 'zhyshkovych16@gmail.com', // must be Gmail
    //     pass: 'romanz16101988'
    //   }
    // });
   
    // var mailOptions = {
    //   from: 'zhyshkovych16@gmail.com',
    //   to: 'zhyshkovych16@gmail.com', // must be Gmail
    //   cc:`roma <zhyshkovych16@gmail.com>`,
    //   subject: 'Sending Email using Node.js',
    //   html: `
    //           <table style="width: 100%; border: none">
    //             <thead>
    //               <tr style="background-color: #000; color: #fff;">
    //                 <th style="padding: 10px 0">Name</th>
    //                 <th style="padding: 10px 0">E-mail</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               <tr>
    //                 <th style="text-align: center">roma</th>
    //                 <td style="text-align: center">zhyshkovych16@gmail.com</td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         `
    // };
  
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });
  }

}
