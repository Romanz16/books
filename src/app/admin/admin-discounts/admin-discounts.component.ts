import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
// import { Product } from 'src/app/shared/classes/product.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
// import { map, finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ISubCategory } from 'src/app/shared/interfaces/subcategory.interface';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';


@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-discounts.component.html',
  styleUrls: ['./admin-discounts.component.scss']
})
export class AdminDiscountsComponent implements OnInit {
  pageTitle = 'Акції';
  adminProducts: Array<IProduct>;

  title = '';
  description = '';
  price = '';
  newprice = '';
  editStatus: boolean;

  formData: IProduct = {
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

  sort1: Array<number> = [3, 3, 3, 3, 3, 3, 3];
  obj: Object;
  p: number = 1;
  constructor(private subcategoryService: SubCategoryService, private productService: ProductsService, private categoryService: CategoryService, private prStorage: AngularFireStorage, private firestore: AngularFirestore) {

  }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      myArray => {
        this.adminProducts = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );
  }

  public deleteProductDiscounts(obj: IProduct): void {
    if(obj.discount[0]){
    obj.price = obj.discount[2];
    obj.discount = ['', '', ''];
    this.firestore.doc('products/' + obj.id).update(obj);
    }
  }

  public editProduct(obj: IProduct): void {
    this.formData = obj;
    this.editStatus = true;
  }

  public saveEditProduct(form: NgForm): void {
    const data = Object.assign({}, form.value);
    delete data.id;
  
    if (this.formData.discount[2]) {
      this.formData.discount = [data.title, data.description, this.formData.discount[2]];
    } else {
      this.formData.discount = [data.title, data.description, this.formData.price];
    }
    this.formData.price = this.newprice;
    this.firestore.doc('products/' + form.value.id).update(this.formData);
    // this.resetForm();
     form.reset();
    this.editStatus = false;
  }

  public sort(name: string, num: number): void {
    const sortColumn = this.sort1[num];
    this.sort1[0] = 3;
    this.sort1[1] = 3;
    this.sort1[2] = 3;
    this.sort1[3] = 3;
    this.sort1[4] = 3;
    this.sort1[5] = 3;
    this.sort1[6] = 3;
    if (sortColumn !== 2) {
      this.sort1[num] = 2;
      // tslint:disable-next-line: only-arrow-functions
      this.adminProducts.sort(function (a, b) {
        const nameA = a[name];
        const nameB = b[name];
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      this.sort1[num] = 1;
      // tslint:disable-next-line: only-arrow-functions
      this.adminProducts.sort(function (a, b) {
        const nameA = a[name];
        const nameB = b[name];
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    }
  }
  public sort2(name: number, num: number): void {

    const sortColumn = this.sort1[num];
    this.sort1[0] = 3;
    this.sort1[1] = 3;
    this.sort1[2] = 3;
    this.sort1[3] = 3;
    this.sort1[4] = 3;
    this.sort1[5] = 3;
    this.sort1[6] = 3;
    if (sortColumn !== 2) {
      this.sort1[num] = 2;
      // tslint:disable-next-line: only-arrow-functions
      this.adminProducts.sort(function (a, b) {

        let nameA = a.discount[name];
        let nameB = b.discount[name];
        if (nameA === undefined) nameA = '0';
        if (nameB === undefined) nameB = '0';

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else {
      this.sort1[num] = 1;
      // tslint:disable-next-line: only-arrow-functions
      this.adminProducts.sort(function (a, b) {
        let nameA = a.discount[name];
        let nameB = b.discount[name];
        if (nameA === undefined) nameA = '0';
        if (nameB === undefined) nameB = '0';
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    }
  }




}

