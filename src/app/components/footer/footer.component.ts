import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  discountId: string;
  adminCategories: Array<ICategory>;
  constructor(private route: ActivatedRoute,
    private location: Location,
    private categoryService: CategoryService) { }

    ngOnInit() {
      this.getCategories();
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
  
}

