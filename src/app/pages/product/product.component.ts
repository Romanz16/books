import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { IOrderProduct } from 'src/app/shared/interfaces/orderproduct';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Array<IProduct> = [];
  cartProducts: Array<IProduct> = [];
  title = '';
  product: IProduct = {
    id: '',
    title: '',
    description: '',
    catId: '',
    catTitle: '',
    subCatId: '',
    subCatTitle: '',
    price: '',
    year: '',
    img: '',
    publishingHouse: '',
    binding: '',
    comments: [],
    author: [],
    discount: [],
    date: '',
    alias: '',
    subCatAlias: '',
    catAlias: ''
  };
  prod: string;
  url: string;
  btnActive = true;

  userLogin: string = '';
  userEmail: string = '';
  photoURL: string = '';
  uid: string = '';
  comment: string = '';
  allComments: Array<any> = [];
  constructor(private firestore: AngularFirestore,
    private toastr: ToastrService,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cart: UsersService) { }


  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.prod = params.get('product');
    });
    this.productService.getProducts().subscribe(
      myArray => {
        this.products = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
        this.products.forEach((el) => {
          if (el.alias === this.prod) {
            this.product = Object.assign({}, el);
            // this.allComments=Object.assign({}, JSON.parse(this.product.comments));
            this.title = this.product.title;
            this.product.comments.forEach((el) => {
              this.allComments.push(JSON.parse(el));
            })
          }
        });

      });


    this.btnDisable();

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

  public addToCart(pr: IProduct): void {
    let ordersProduct: IOrderProduct;
    ordersProduct = Object.assign({}, this.product, { 'count': 1 });
    this.cart.setData(ordersProduct);
    this.btnActive = false;
    this.btnDisable();
  }
  public btnDisable(): void {
    this.cartProducts = this.cart.getData();

    if (this.cartProducts !== null) {
      for (let i = 0; i < this.cartProducts.length; i++) {
        console.log('btn2', this.btnActive, this.title);
        if (this.cartProducts[i].alias === this.prod) {
          this.btnActive = false;
          console.log('btn3', this.btnActive);
        }
      }
    }

  }
  public addcomment(): void {
    if (this.comment !== '') {
      // this.userLogin = JSON.parse(localStorage.getItem('user')).displayName;
      // const cartJson = JSON.stringify(this.products);
      // this.userEmail = JSON.parse(localStorage.getItem('user')).email;
      // this.photoURL = JSON.parse(localStorage.getItem('user')).photoURL;
      let com: any = {
        uid: this.uid,
        displayName: this.userLogin,
        photoURL: this.photoURL,
        email: this.userEmail,
        comment: this.comment
      };
      this.product.comments.push(JSON.stringify(com));
      this.firestore.doc('products/' + this.product.id).update(this.product);
      this.toastr.success('Ваш коментар додано!', 'Успіх');
    } else {
      this.toastr.info('Ви не ввели коментар!', 'Увага');
    }
  }
}
