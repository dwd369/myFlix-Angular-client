import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})

export class NavigationBarComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {}

  logoutUser(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}
