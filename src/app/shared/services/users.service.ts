import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  products: Array<IUser>;
  constructor(private firestore: AngularFirestore) {
  }

  public getUser() {
    return this.firestore.collection('users').snapshotChanges();
  }
  public getOneUser(id: string) {
    return this.firestore.doc('users/' + id).snapshotChanges();
  }
}
