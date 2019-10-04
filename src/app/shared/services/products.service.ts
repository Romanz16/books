import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { Product } from '../classes/product.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Array<IProduct>;
  constructor(private firestore: AngularFirestore) {
  }


  public getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }
  public getOneProducts(id: string) {
    return this.firestore.doc('products/' + id).snapshotChanges();
  }
  public getBinding() {
    return this.firestore.collection('binding').snapshotChanges();
  }
  public getPublishingHouse() {
    return this.firestore.collection('publishingHouse').snapshotChanges();
  }
  public getAuthor() {
    return this.firestore.collection('author').snapshotChanges();
  } 
}
