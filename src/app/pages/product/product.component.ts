import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Array<IProduct> = [];
  product: IProduct = {
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
  prod: string;
  url: string;
  constructor(private route: ActivatedRoute,
    private productService: ProductsService) { }


  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.prod = params.get('product');
    });
    this.productService.getProducts().subscribe(
      myArray => {
        this.products = myArray.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as any;
        });
        this.products.forEach((el) => {
          if (el.alias === this.prod) {
            this.product = Object.assign({}, el);
          }
        });

      });

  }

}
