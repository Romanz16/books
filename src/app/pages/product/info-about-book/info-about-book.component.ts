import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-info-about-book',
  templateUrl: './info-about-book.component.html',
  styleUrls: ['./info-about-book.component.scss']
})
export class InfoAboutBookComponent implements OnInit {
  products: Array<IProduct>;
  product: IProduct;
  prod: string;
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
