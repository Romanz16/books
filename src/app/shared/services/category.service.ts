import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  formData: any;
  constructor(private firestore: AngularFirestore) {

  }

  public getCategories() {
    return this.firestore.collection('categories').snapshotChanges();
  }
  public getOneCategory(id: string) {
    return this.firestore.doc('categories/' + id).snapshotChanges();
  }
}
