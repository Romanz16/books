import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  products: Array<IProduct> = [];
  constructor(private userService: UsersService) {
    this.products = this.userService.getData();
   }

  ngOnInit() {
  }
 public deleteProduct(prod:IProduct){

 }
}
