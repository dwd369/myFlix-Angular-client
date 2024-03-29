import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * WelcomePageComponent generates the welcome screen for the web app.
 *
 * @example
 * <!-- In a template -->
 * <WelcomePageComponent></WelcomePageComponent>
 */

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})

export class WelcomePageComponent implements OnInit {
  
  // define constructor for MatDialog
  constructor(public dialog: MatDialog) { }

  // define ngOnit function
  ngOnInit(): void {
  }

  // declare function to open User registration dialog
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    })
  }
}