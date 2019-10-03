import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ISubCategory } from 'src/app/shared/interfaces/subcategory.interface';
import { ICategory } from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss']
})
export class NewArrivalsComponent implements OnInit {
  products: Array<IProduct>;
  category: Array<ICategory>;
  subCat: Array<ISubCategory>;
  // tslint:disable-next-line: max-line-length
  constructor(private subcategoryService: SubCategoryService, private productService: ProductsService, private categoryService: CategoryService) { }

  ngOnInit() {
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

}
