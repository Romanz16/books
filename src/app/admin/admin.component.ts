import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService,) {
    if (!this.authService.isAdmin()){this.router.navigate(['/login']);};
   }

  ngOnInit() {
  }

}
