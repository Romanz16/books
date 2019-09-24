import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  discountId: string;
  constructor(private route: ActivatedRoute,
    private location: Location) { }

    ngOnInit() {
     
    }
  
}
