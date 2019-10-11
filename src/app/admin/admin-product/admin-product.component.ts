import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
// import { Product } from 'src/app/shared/classes/product.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import {  Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ISubCategory } from 'src/app/shared/interfaces/subcategory.interface';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';

// import { FormControl } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})


export class AdminProductComponent implements OnInit {
  pageTitle = 'Продукти';
  adminProducts: Array<IProduct>;
  category: Array<ICategory>;
  subCat: Array<ISubCategory>;
  binding: Array<string>;
  author: Array<string>;
  publishingHouse: Array<string>;
  title = '';
  description = '';
  weight: string;
  size: string;
  price = '';
  catId = '';
  subCatId = '';
  editId: number;
  editStatus: boolean;
  productImage: string;
  newPublishingHouse: string;
  newAuthor: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;

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
  // dropdownList = [];
  // selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  sort1: Array<number> = [3, 3, 3, 3, 3, 3, 3];
  obj: Object;
  p: number = 1;
  // tslint:disable-next-line: max-line-length
  constructor(private subcategoryService: SubCategoryService, private productService: ProductsService, private categoryService: CategoryService, private prStorage: AngularFireStorage, private firestore: AngularFirestore) {
    // this.getProdData();
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      myArray => {
        this.category = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );
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
    this.getSubCategories();
    this.getBinding();
    this.getPublishingHouse();
    this.getAuthor();
    // this.dropdownList = [];
    // this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }
  public onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }
  public onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }



  public getSubCategories(): void {
    this.subcategoryService.getSubCategories().subscribe(
      myArray => {
        this.subCat = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );
  }
  public getBinding(): void {
    this.productService.getBinding().subscribe(
      myArray => {
        this.binding = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );
  }
  public getPublishingHouse(): void {
    this.productService.getPublishingHouse().subscribe(
      myArray => {
        this.publishingHouse = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );
  }
  public getAuthor(): void {
    this.productService.getAuthor().subscribe(
      myArray => {
        this.author = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );


  }
  public addNewPublishingHouse() {
    let check = true;
    const newPub = { name: this.newPublishingHouse };
    this.publishingHouse.filter(elem => {

      if (elem['name'] === this.newPublishingHouse) {
        alert('Видавництво з таким іменем вже існує!');
        check = false;
      }
    });
    if (check) {
      this.newPublishingHouse = '';
      this.firestore.collection('publishingHouse').add(newPub);
    }
  }

  public addNewAuthor() {
    let check = true;
    const newPub = { name: this.newAuthor };
    this.author.filter(elem => {
      if (elem[name] === this.newAuthor) {
        alert('Автор з таким іменем вже існує!');
        check = false;
      }
    });
    if (check) {
      this.newAuthor = '';
      this.firestore.collection('author').add(newPub);
    }
  }

  public onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    let tmp: string = data.catId;
    let ctitle: string;
    let sctitle: string;
    let calias: string;
    let scalias: string;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.category.length; i++) {
      if (this.category[i].id === tmp) {
        calias = this.category[i].alias;
        ctitle = this.category[i].title;
      }
    }
    tmp = data.subCatId;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.subCat.length; i++) {
      if (this.subCat[i].id === tmp) {
        sctitle = this.subCat[i].title;
        scalias = this.subCat[i].alias;
      }
    }
    const tmpAuthor: Array<string> = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < data.author.length; ++i) {
      const name: string = data.author[i].name;
      tmpAuthor[i] = name;
    }
    const mydate = new Date();
    data.alias = this.alias(data.title.toLowerCase());
    this.obj = {
      title: data.title,
      description: data.description,
      catId: data.catId,
      catTitle: ctitle,
      catAlias: calias,
      subCatId: data.subCatId,
      subCatTitle: sctitle,
      subCatAlias: scalias,
      price: data.price,
      year: data.year,
      img: data.img,
      publishingHouse: data.publishingHouse,
      binding: data.binding,
      comments: [],
      author: tmpAuthor,
      discount: [],
      date: mydate,
      alias: data.alias,
    };
    this.firestore.collection('products').add(this.obj);
    this.resetForm();
  }

  public resetForm(form?: NgForm): void {
    if (form != null) {
      form.reset();
    } else {
      // this. selectedItems = [];
      this.urlImage = '';
      this.productImage = '';
      this.formData = {
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
    }
  }

  public deleteProduct(obj: IProduct): void {
    this.firestore.doc('products/' + obj.id).delete();
    this.prStorage.storage.refFromURL(obj.img).delete();
  }

  public editProduct(obj: IProduct): void {
    this.formData = obj;
    this.productImage = obj.img;
    this.editStatus = true;
    // this.selectedItems =Object.assign({}, obj.author);
  }

  public saveEditProduct(form: NgForm): void {
    const data = Object.assign({}, form.value);
    delete data.id;
    let tmp: string = data.catId;
    let ctitle: string;
    let sctitle: string;
    let calias: string;
    let scalias: string;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.category.length; i++) {
      if (this.category[i].id === tmp) {
        calias = this.category[i].alias;
        ctitle = this.category[i].title;
      }
    }
    tmp = data.subCatId;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.subCat.length; i++) {
      if (this.subCat[i].id === tmp) {
        sctitle = this.subCat[i].title;
        scalias = this.subCat[i].alias;
      }
    }
    const tmpAuthor: Array<string> = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < data.author.length; ++i) {
      if (typeof data.author[i] === 'object') {
        const name: string = data.author[i].name;
        tmpAuthor[i] = name;
      } else {
        tmpAuthor[i] = data.author[i];
      }
    }
    console.log('strtmp', tmpAuthor);
    const mydate = new Date();
    data.alias = this.alias(data.title.toLowerCase());
    this.obj = {
      title: data.title,
      description: data.description,
      catId: data.catId,
      catTitle: ctitle,
      catAlias: calias,
      subCatId: data.subCatId,
      subCatTitle: sctitle,
      subCatAlias: scalias,
      price: data.price,
      year: data.year,
      img: data.img,
      publishingHouse: data.publishingHouse,
      binding: data.binding,
      comments: [],
      author: tmpAuthor,
      discount: [],
      date: mydate,
      alias: data.alias,
    };
 
    this.firestore.doc('products/' + form.value.id).update(this.obj);
    this.resetForm();
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
      this.adminProducts.sort(function(a, b) {
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
      this.adminProducts.sort(function(a, b) {
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

  public alias(text: string): string {
    const arrru = new Array(',', '’', '\'', '-', ' ', 'Є', 'є', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ї', 'ї', 'Ґ', 'ґ', 'І', 'і', 'Я', 'я', 'Ю', 'ю', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ж', 'ж', 'А', 'а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Д', 'д', 'Е', 'е', 'Ё', 'ё', 'З', 'з', 'И', 'и', 'Й', 'й', 'К', 'к', 'Л', 'л', 'М', 'м', 'Н', 'н', 'О', 'о', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'У', 'у', 'Ф', 'ф', 'Х', 'х', 'Ц', 'ц', 'Ы', 'ы', 'Ь', 'ь', 'Ъ', 'ъ', 'Э', 'э');
    const arren = new Array( '', '', '', '_', '_', 'Ye', 'ye', 'Ch', 'ch', 'Sch', 'sch', 'Sch', 'sch', 'Yi', 'yi', 'G', 'g', 'I', 'i', 'Ya', 'ya', 'Yu', 'yu', 'Ch', 'ch', 'Sh', 'sh', 'Sh', 'sh', 'Zh', 'zh', 'A', 'a', 'B', 'b', 'V', 'v', 'G', 'g', 'D', 'd', 'E', 'e', 'E', 'e', 'Z', 'z', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'F', 'f', 'H', 'h', 'C', 'c', 'Y', 'y', '', '', '', '', 'E', 'e');

    for (let i = 0; i < arrru.length; i++) {
      const reg = new RegExp(arrru[i], 'g');
      text = text.replace(reg, arren[i]);
    }

    return text;
  }
  public upload(event): void {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.prStorage.ref(`images/${id}`);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url => this.productImage = url);
      })
    ).subscribe();
  }

}

