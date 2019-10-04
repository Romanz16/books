import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICategory } from 'src/app/shared/interfaces/category.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  ulMenu: string;
  ulMenuHeight: string;
  checkMenu: boolean = true;
  searchText: string;
  adminCategories: Array<ICategory>;
  constructor(private route: ActivatedRoute,
    private location: Location, private categoryService: CategoryService, private firestore: AngularFirestore) {

  }

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
  public menu(): void {
    if (this.checkMenu) {
      this.ulMenuHeight = '205px';
      this.ulMenu = 'flex';
      this.checkMenu = false;
    } else {
      this.ulMenuHeight = '41px';
      this.checkMenu = true;
      this.ulMenu = 'none';
    }
  }
  onResize(event) {
    if (event.target.innerWidth > 400) {
      this.ulMenuHeight = '41px';
      this.ulMenu = 'flex';
    } else {
      this.ulMenu = 'none';
    }
  }
}
