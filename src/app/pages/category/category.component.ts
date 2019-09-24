import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  catId: string;
  pcatId: string = '';
  price: Array<any>;
  year: Array<any>;
  constructor(private route: ActivatedRoute,
    private location: Location) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.catId = params.get('id');
      this.pcatId = params.get('pid');
    });
  }
  onSliderChangePrice(selectedValues: number[]) {
    this.price = selectedValues;
    console.log(this.price);
  }
  onSliderChangeYear(selectedValues: number[]) {
    this.year = selectedValues;
    console.log(this.year);
  }
}
