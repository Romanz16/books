import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { IOrderProduct } from 'src/app/shared/interfaces/orderproduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Array<IProduct> = [];
  cartProducts: Array<IProduct> = [];
  title='';
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
  constructor(private route: ActivatedRoute,
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
            this.title=this.product.title;
          }
        });

      });
     
 
    this.btnDisable();

  }

  public addToCart(pr: IProduct): void {
    let ordersProduct:IOrderProduct;
    ordersProduct =Object.assign({}, this.product,{'count':1});
    this.cart.setData(ordersProduct);
    this.btnActive = false;
    this.btnDisable();
  }
  public btnDisable(): void {
    this.cartProducts = this.cart.getData();

     if (this.cartProducts !== null) {
    for (let i = 0; i < this.cartProducts.length; i++) {
      console.log('btn2', this.btnActive,  this.title);
      if (this.cartProducts[i].alias === this.prod) {
        this.btnActive = false;
        console.log('btn3', this.btnActive);
       }
      }
    }

  }
}
