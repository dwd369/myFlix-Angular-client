import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * NavigationBarComponent represents the navigation bar in the application.
 *
 * @example
 * <!-- In a template -->
 * <NavigationBarComponent></NavigationBarComponent>
 */
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
