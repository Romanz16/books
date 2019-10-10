import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct } from '../interfaces/product.interface';
import { IOrderProduct } from '../interfaces/orderproduct';
//cart
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // products: Array<IProduct> = [];
  products: Array<IOrderProduct> = [];
  // onproducts: EventEmitter<Array<IProduct>> = new EventEmitter();
  onproducts: EventEmitter<Array<IOrderProduct>> = new EventEmitter();
  constructor(private firestore: AngularFirestore) {
    const getCart = localStorage.getItem('cart');
    this.products = JSON.parse(getCart);
    this.onproducts.emit(this.products);
  }

  getData(): Array<IOrderProduct> {
    const getCart = localStorage.getItem('cart');
    this.products = JSON.parse(getCart);
    this.onproducts.emit(this.products);
    return this.products;
  }

  setData(obj: IOrderProduct): void {
    if (!!obj) {
      this.products =this.products || [];
      this.products.push(obj);
      const cartJson = JSON.stringify(this.products);
      localStorage.setItem('cart', cartJson);
    };
    this.onproducts.emit(this.products);
  }


  deleteData(index: number) {
    this.products.splice(index, 1);
    const cartJson = JSON.stringify(this.products);
    localStorage.setItem('cart', cartJson);
    this.onproducts.emit(this.products);
  }
  deleteAllData() {
    this.products=[];
    const cartJson = JSON.stringify(this.products);
    localStorage.setItem('cart', cartJson);
    this.onproducts.emit(this.products);
  }

  updateData(obj: IOrderProduct, index) {
    this.products.splice(index, 1, obj);
    this.onproducts.emit(this.products);
  }

}
