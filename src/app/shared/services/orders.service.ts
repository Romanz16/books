import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private firestore: AngularFirestore) { }

  public getOrders() {
    return this.firestore.collection('orders').snapshotChanges();
  }
  public getOneOrders(id: string) {
    return this.firestore.doc('orders/' + id).snapshotChanges();
  }
}
