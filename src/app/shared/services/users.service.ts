import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct } from '../interfaces/product.interface';
//cart
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  products: Array<IProduct> = [];
  onproducts: EventEmitter<Array<IProduct>> = new EventEmitter();
  constructor(private firestore: AngularFirestore) {
    const getCart = localStorage.getItem('cart');
    this.products = JSON.parse(getCart);
    this.onproducts.emit(this.products);
  }

  getData(): Array<IProduct> {
    const getCart = localStorage.getItem('cart');
    this.products = JSON.parse(getCart);
    this.onproducts.emit(this.products);
    return this.products;
  }

  setData(obj: IProduct): void {
    if (!!obj) {
      this.products =this.products || [];
      this.products.push(obj);
      // Object.assign({}, obj);
      // let num: number = 0;
      // if (this.products) { num = this.products.length; }
      // this.products[num] = Object.assign({}, obj);
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

  // updateData(obj: IProduct, index) {
  //   this.products.splice(index, 1, obj);
  // }

  // public getUser() {
  //   return this.firestore.collection('users').snapshotChanges();
  // }
  // public getOneUser(id: string) {
  //   return this.firestore.doc('users/' + id).snapshotChanges();
  // }
}
