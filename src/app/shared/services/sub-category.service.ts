import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private firestore: AngularFirestore) { }

  public getSubCategories() {
    return this.firestore.collection('subCategories').snapshotChanges();
  }
  public getOneSubCategory(id: string) {
    return this.firestore.doc('subCategories/' + id).snapshotChanges();
  }
}
