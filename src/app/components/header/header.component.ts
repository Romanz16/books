import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  ulMenu: string;
  ulMenuHeight: string;
  checkMenu: boolean = true;
  constructor(private route: ActivatedRoute,
    private location: Location) {

  }

  ngOnInit() {
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
    } else{
      this.ulMenu = 'none';
    }
  }
}
