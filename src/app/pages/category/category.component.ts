import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
// import { switchMap } from 'rxjs/operators';
import { ISubCategory } from 'src/app/shared/interfaces/subcategory.interface';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  products: Array<IProduct> = [];
  category: string;
  subcat = '';
  price: Array<any> = [];
  year: Array<any> = [];
  author: string;
  allAuthor: Array<string>;
  binding: string;
  allBinding: Array<string>;
  publishing: string;
  allPublishing: Array<string>;

  adminSubCategories: Array<ISubCategory> = [];
  adminCategories: Array<ICategory> = [];

  min: number;
  max: number;
  p: number = 1;
  constructor(private route: ActivatedRoute,
    private location: Location, private subcategoryService: SubCategoryService,
    private categoryService: CategoryService, private firestore: AngularFirestore,
    private productService: ProductsService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('cat');
      this.subcat = params.get('subcat');
      this.price[0] = this.min;
      this.price[1] = this.max;
      // this.maxprice = this.maxPrice();
    });
    this.getCategories();
    this.getSubCategories();
    this.getProducts();
    this.getAuthor();
    this.getBinding();
    this.getPublishing();
  }
  onSliderChangePrice(selectedValues: number[]) {
    this.price = selectedValues;
    console.log(this.price);
  }
  onSliderChangeYear(selectedValues: number[]) {
    this.year = selectedValues;
    console.log(this.year);
  }
  public getProducts(): void {
    this.productService.getProducts().subscribe(
      myArray => {
        this.products = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );
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
      }
    );
  }
  public getAuthor(): void {
    this.productService.getAuthor().subscribe(
      myArray => {
        this.allAuthor = myArray.map(item => {
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
        this.allBinding = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );

  }
  public getPublishing(): void {
    this.productService.getPublishingHouse().subscribe(
      myArray => {
        this.allPublishing = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
      }
    );

  }
  public getSubCatByCat(id: string): void {
    // tslint:disable-next-line: no-unused-expression
    this.adminSubCategories = this.adminSubCategories.filter(elem => { elem.id === id; });
  }
  public minPrice(): number {
    this.min = 150;
    if (this.subcat) {
      this.products.filter(el => {
        if (el.subCatAlias === this.subcat) {
          if (+el.price < this.min) {
            this.min = +el.price;
          }
        }
      });
    } else if (this.category) {
      if (this.category === 'all') {
        this.products.filter(el => {
          if (+el.price < this.min) {
            this.min = +el.price;
          }
        });
      } else {
        this.products.filter(el => {
          if (el.catAlias === this.category) {
            if (+el.price < this.min) {
              this.min = +el.price;
            }
          }
        });
      }
    }
    return Math.round(this.min - 1);
  }
  public maxPrice(): number {
    this.max = 150;
    if (this.subcat) {
      this.products.filter(el => {
        if (el.subCatAlias === this.subcat) {
          if (+el.price > this.max) {
            this.max = +el.price;
          }
        }
      });
    } else if (this.category) {
      if (this.category === 'all') {
        this.products.filter(el => {
          if (+el.price > this.max) {
            this.max = +el.price;
          }
        });
      } else {
        this.products.filter(el => {
          if (el.catAlias === this.category) {
            if (+el.price > this.max) {
              this.max = +el.price;
            }
          }
        });
      }
    }
    // console.log('max',this.price[1]);
    return Math.round(this.max + 1);
  }

  public minYear(): number {
    let min = +this.products[0].year;
    if (this.subcat) {
      this.products.filter(el => {
        if (el.subCatAlias === this.subcat) {
          if (+el.year < min) {
            min = +el.year;
          }
        }
      });
    } else if (this.category) {
      if (this.category === 'all') {
        this.products.filter(el => {
          if (+el.year < min) {
            min = +el.year;
          }
        });
      } else {
        this.products.filter(el => {
          if (el.catAlias === this.category) {
            if (+el.year < min) {
              min = +el.year;
            }
          }
        });
      }
    }
    return min;
  }


  public maxYear(): number {
    let max = +this.products[0].year;
    if (this.subcat) {
      this.products.filter(el => {
        if (el.subCatAlias === this.subcat) {
          if (+el.year > max) {
            max = +el.year;
          }
        }
      });
    } else if (this.category) {
      if (this.category === 'all') {
        this.products.filter(el => {
          if (+el.year > max) {
            max = +el.year;
          }
        });
      } else {
        this.products.filter(el => {
          if (el.catAlias === this.category) {
            if (+el.year > max) {
              max = +el.year;
            }
          }
        });
      }
    }
    return max;
  }
}
