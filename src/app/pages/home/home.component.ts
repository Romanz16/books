import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // images = [1, 2, 3].map(() => `https://picsum.photos/1024/300?random&t=${Math.random()}`);
  images = [1, 2, 3].map(() => `../../../assets/slider/${this.randomInteger(1, 17)}.jpg`);
  products: Array<IProduct>;
  constructor(private productService: ProductsService) { }

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
  }
public randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
}
