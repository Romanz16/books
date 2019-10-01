import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ISubCategory } from 'src/app/shared/interfaces/subcategory.interface';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';



@Component({
  selector: 'app-admin-sub-category',
  templateUrl: './admin-sub-category.component.html',
  styleUrls: ['./admin-sub-category.component.scss']
})
export class AdminSubCategoryComponent implements OnInit {
  pageTitle = 'ПідКатегорії';
  adminSubCategories: Array<ISubCategory>;
  adminCategories: Array<ICategory>;
  formData: ISubCategory = {
    id: '',
    title: '',
    alias: '',
    parentId: ''
  };
  title: string;
  editId: number;
  editStatus: boolean;

  sort1: Array<number> = [3, 3, 3, 3];
  // tslint:disable-next-line: max-line-length
  constructor(private subcategoryService: SubCategoryService, private categoryService: CategoryService, private firestore: AngularFirestore) { }


  ngOnInit() {
    this.getCategories();
    this.getSubCategories();
  }
  
  public adminCat(catid: string): string {// title by parent category
    const cat: Array<ICategory> = this.adminCategories.filter(elem => elem.id === catid);
    return cat[0].title;
  }
  public getCategories(): void {
    this.categoryService.getCategories().subscribe(
      myArray => {
        this.adminCategories = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );
  }
  public getSubCategories(): void {
    this.subcategoryService.getSubCategories().subscribe(
      myArray => {
        this.adminSubCategories = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
        // console.log('sub', this.adminSubCategories);
      }
    );
  }
  public onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    data.title = data.title.charAt(0).toUpperCase() + data.title.toLowerCase().substring(1);
    if (this.adminSubCategories.some(elem => elem.title === data.title)) {
      alert('Категорія з такою назвою вже існує!');
    } else {
      data.alias = this.alias(data.title.toLowerCase());
      this.firestore.collection('subCategories').add(data);
      this.resetForm();
    }
  }


  public resetForm(form?: NgForm): void {
    if (form != null) {
      form.reset();
    } else {
      this.formData = {
        id: '',
        title: '',
        alias: '',
        parentId: ''
      };
    }
  }
  public deleteCategory(obj: ISubCategory): void {
    this.firestore.doc('subCategories/' + obj.id).delete();
  }

  public editCategory(obj: ISubCategory): void {
    this.formData = obj;
    this.editStatus = true;
  }
  public saveEditCategory(form: NgForm): void {
    const data = Object.assign({}, form.value);
    data.title = data.title.charAt(0).toUpperCase() + data.title.toLowerCase().substring(1);
    if (this.adminSubCategories.some(elem => (elem.title === data.title && elem.id !== data.id))) {
      alert('Категорія з такою назвою вже існує!');
    } else {
      delete data.id;
      data.alias = this.alias(data.title.toLowerCase());
      this.firestore.doc('subCategories/' + form.value.id).update(data);
      this.resetForm();
      this.editStatus = false;
      this.getCategories();
    }
  }
  public sort(name: string, num: number): void {
    const sortColumn = this.sort1[num];
    this.sort1[0] = 3;
    this.sort1[1] = 3;
    if (sortColumn !== 2) {
      this.sort1[num] = 2;
      this.adminSubCategories.sort(function (a, b) {
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
      this.adminSubCategories.sort(function (a, b) {
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
    const arrru = new Array(',','’',"'",'-',' ', 'Є', 'є', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ї', 'ї', 'Ґ', 'ґ', 'І', 'і', 'Я', 'я', 'Ю', 'ю', 'Ч', 'ч', 'Ш', 'ш', 'Щ', 'щ', 'Ж', 'ж', 'А', 'а', 'Б', 'б', 'В', 'в', 'Г', 'г', 'Д', 'д', 'Е', 'е', 'Ё', 'ё', 'З', 'з', 'И', 'и', 'Й', 'й', 'К', 'к', 'Л', 'л', 'М', 'м', 'Н', 'н', 'О', 'о', 'П', 'п', 'Р', 'р', 'С', 'с', 'Т', 'т', 'У', 'у', 'Ф', 'ф', 'Х', 'х', 'Ц', 'ц', 'Ы', 'ы', 'Ь', 'ь', 'Ъ', 'ъ', 'Э', 'э');
    const arren = new Array('','','','_','_', 'Ye', 'ye', 'Ch', 'ch', 'Sch', 'sch', 'Sch', 'sch', 'Yi', 'yi', 'G', 'g', 'I', 'i', 'Ya', 'ya', 'Yu', 'yu', 'Ch', 'ch', 'Sh', 'sh', 'Sh', 'sh', 'Zh', 'zh', 'A', 'a', 'B', 'b', 'V', 'v', 'G', 'g', 'D', 'd', 'E', 'e', 'E', 'e', 'Z', 'z', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'F', 'f', 'H', 'h', 'C', 'c', 'Y', 'y', '', '', '', '', 'E', 'e');

    for (let i = 0; i < arrru.length; i++) {
      const reg = new RegExp(arrru[i], 'g');
      text = text.replace(reg, arren[i]);
    }
    return text;
  }
}
